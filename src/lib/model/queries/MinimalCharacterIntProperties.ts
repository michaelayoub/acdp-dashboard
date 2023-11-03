/**
 * COLUMN_NAMES = [ "OBJECT_ID", "PROPERTY_NAME", "VALUE", "VALUE_LABEL", "CHARACTER_NAME", "IS_DELETED"]
 * COLUMN_TYPES = [ "BIGINT", "STRING", "INTEGER", "STRING", "STRING", "BOOLEAN" ]
 */

const textDecoder = new TextDecoder();

export const QUERY = "select i.object_id AS object_id, i.property_name AS property_name, i.value AS value, i.value_label AS value_label, c.name AS character_name, c.is_deleted AS is_deleted FROM shard_biota_properties_int_table i join shard_character_table c on i.object_id = c.object_id where i.property_name in ('Level', 'CharacterTitleId', 'CreatureKills', 'NumDeaths') emit changes;";

export type MinimalCharacterIntProperties = {
    objectId: number;
    propertyName: string;
    value: number;
    valueLabel: string;
    characterName: string;
    isDeleted: boolean;
}

export function processIntPropsChunk(chunk: Uint8Array): MinimalCharacterIntProperties[] {
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

            const propRecord: MinimalCharacterIntProperties = {
                objectId: values[0],
                propertyName: values[1],
                value: values[2],
                valueLabel: values[3],
                characterName: values[4],
                isDeleted: values[5]
            };

            parsed.push(propRecord);
        }
    }

    return parsed;
}
