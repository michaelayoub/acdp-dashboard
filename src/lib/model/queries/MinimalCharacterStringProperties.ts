/**
 * COLUMN_NAMES = [ "OBJECT_ID", "PROPERTY_NAME", "VALUE", "CHARACTER_NAME", "IS_DELETED" ];
 * COLUMN_TYPES = [ "BIGINT", "STRING", "STRING", "STRING", "BOOLEAN" ];
 */

const textDecoder = new TextDecoder();

export const QUERY = "select s.object_id AS object_id, s.property_name AS property_name, s.value AS value, c.name AS character_name, c.is_deleted AS is_deleted FROM shard_biota_properties_string_table s join shard_character_table c on s.object_id = c.object_id emit changes;";

export const QUERY_PARAM = "select s.object_id AS object_id, s.property_name AS property_name, s.value AS value, c.name AS character_name, c.is_deleted AS is_deleted FROM shard_biota_properties_string_table s join shard_character_table c on s.object_id = c.object_id where c.object_id = ${objectId} emit changes;"

export type MinimalCharacterStringProperties = {
    objectId: number;
    propertyName: string;
    value: string;
    characterName: string;
    isDeleted: boolean;
}

export function processStringPropsChunk(chunk: Uint8Array): MinimalCharacterStringProperties[] {
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

            const propRecord: MinimalCharacterStringProperties = {
                objectId: values[0],
                propertyName: values[1],
                value: values[2],
                characterName: values[3],
                isDeleted: values[4]
            };

            parsed.push(propRecord);
        }
    }

    return parsed;
}