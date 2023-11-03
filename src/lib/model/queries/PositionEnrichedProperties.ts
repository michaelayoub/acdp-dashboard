/**
 * COLUMN_NAMES = ['OBJECT_ID', PROPERTY_NAME', OBJ_CELL_ID', ORIGIN_X', ORIGIN_Y', ORIGIN_Z', COORDINATES', FIVE_NEAREST_POIS', CHARACTER_NAME', IS_DELETED']
 * COLUMN_TYPES = ['BIGINT', STRING', BIGINT', DOUBLE', DOUBLE', DOUBLE', STRING', ARRAY<STRING>', STRING', BOOLEAN']
 */

const textDecoder = new TextDecoder();

export const QUERY_PARAM = "select p.object_id AS object_id, p.property_name AS property_name, p.obj_cell_id AS obj_cell_id, p.origin_x AS origin_x, p.origin_y AS origin_y, p.origin_z AS origin_z, p.coordinates AS coordinates, p.five_nearest_pois AS five_nearest_pois, c.name AS character_name, c.is_deleted AS is_deleted FROM shard_biota_properties_position_enriched p join shard_character_table c on p.object_id = c.object_id where p.property_name in ('Location', 'LastOutsideDeath') and c.object_id = ${objectId} emit changes;";

export type PositionEnrichedProperties = {
    objectId: number;
    propertyName: string;
    objCellId: number;
    originX: number;
    originY: number;
    originZ: number;
    coordinates: string;
    fiveNearestPOIs: string[];
    characterName: string;
    isDeleted: boolean;
}

export function processPosPropsChunk(chunk: Uint8Array): PositionEnrichedProperties[] {
    const textChunk = textDecoder.decode(chunk);
    const lines = textChunk.split("\n");

    const parsed = [];
    for (const line of lines) {
        if (line !== '') {
            let values;
            try {
                values = JSON.parse(line);
            } catch (error) {
                console.error("Error parsing: " + line);
                console.error(error);
            }

            if ("queryId" in values) {
                // This is metadata about the query, not the result.
                continue;
            }

            const propRecord: PositionEnrichedProperties = {
                objectId: values[0],
                propertyName: values[1],
                objCellId: values[2],
                originX: values[3],
                originY: values[4],
                originZ: values[5],
                coordinates:values[6],
                fiveNearestPOIs: values[7],
                characterName: values[8],
                isDeleted: values[9]
            };

            parsed.push(propRecord);
        }
    }

    return parsed;
}
