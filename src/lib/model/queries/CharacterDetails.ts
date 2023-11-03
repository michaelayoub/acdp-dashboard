/**
 * COLUMN_NAMES = [ "OBJECT_ID", "ATTRIBUTE_DETAILS_LIST", "ENRICHED_SKILL_DETAILS_LIST", "ENRICHED_ATTRIBUTE_2ND_DETAILS_LIST"]
 * COLUMN_TYPES = [ "BIGINT",
 *                   "ARRAY<STRUCT<`PROPERTY_TYPE` INTEGER,
 *                                 `PROPERTY_NAME` STRING,
 *                                 `INITIAL_LEVEL` BIGINT, 
 *                                 `NUM_TIMES_INCREASED` BIGINT, 
 *                                 `XP_SPENT` BIGINT, 
 *                                 `CURRENT_LEVEL` BIGINT>>",
                     "ARRAY<STRUCT<`PROPERTY_TYPE` INTEGER,
 *                                 `PROPERTY_NAME` STRING,
 *                                 `INITIAL_LEVEL` BIGINT,
 *                                 `NUM_TIMES_INCREASED` INTEGER,
 *                                 `LEVEL_FROM_ATTRIBUTES` INTEGER,
 *                                 `CURRENT_LEVEL` INTEGER, `XP_SPENT` BIGINT,
 *                                 `SKILL_ADVANCEMENT_CLASS_TYPE` BIGINT,
 *                                 `SKILL_ADVANCEMENT_CLASS_NAME` STRING,
 *                                 `LAST_USED_TIMESTAMP` STRING>>",
 *                   "ARRAY<STRUCT<`PROPERTY_TYPE` INTEGER,
 *                                 `PROPERTY_NAME` STRING,
 *                                 `INITIAL_LEVEL` BIGINT,
 *                                 `NUM_TIMES_INCREASED` BIGINT,
 *                                 `XP_SPENT` BIGINT,
 *                                 `CURRENT_LEVEL` BIGINT,
 *                                 `CURRENT_LEVEL_WITH_ENCHANTMENTS` BIGINT>>"]
 */

const textDecoder = new TextDecoder();

export const QUERY = "select object_id, attribute_details_list, enriched_skill_details_list, enriched_attribute_2nd_details_list from shard_character_enriched where object_id = ${objectId} emit changes;";

export type AttributeDetail = {
    name: string;
    initialLevel: number;
    numTimesIncreased: number;
    xpSpent: number;
    currentLevel: number;
};
export type EnrichedSkill = {
    name: string;
    initialLevel: number;
    numTimesIncreased: number;
    levelFromAttributes: number;
    currentLevel: number;
    xpSpent: number;
    skillAdvancementClass: string;
};
export type Attribute2ndDetail = {
    name: string;
    initialLevel: number;
    numTimesIncreased: number;
    xpSpent: number;
    currentLevel: number;
    currentLevelWithEnchantments: number;
};

export type CharacterDetail = {
    objectId: number;
    attributeDetails: AttributeDetail[];
    enrichedSkillDetails: EnrichedSkill[];
    enrichedAttribute2ndDetails: Attribute2ndDetail[];
};

export function processCharacterDetailsChunk(chunk: Uint8Array) {
    const textChunk = textDecoder.decode(chunk);
    const lines = textChunk.split("\n");

    const parsed: CharacterDetail[] = [];
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

            const propRecord: Partial<CharacterDetail> = {
                objectId: values[0]
            };
            propRecord.attributeDetails = [];
            propRecord.enrichedAttribute2ndDetails = [];
            propRecord.enrichedSkillDetails = [];

            for (const attributeDetailValue of values[1]) {
                propRecord.attributeDetails.push({
                    name: attributeDetailValue.PROPERTY_NAME,
                    initialLevel: attributeDetailValue.INITIAL_LEVEL,
                    numTimesIncreased: attributeDetailValue.NUM_TIMES_INCREASED,
                    xpSpent: attributeDetailValue.XP_SPENT,
                    currentLevel: attributeDetailValue.CURRENT_LEVEL
                });
            }

            for (const skillDetailValue of values[2]) {
                propRecord.enrichedSkillDetails.push({
                    name: skillDetailValue.PROPERTY_NAME,
                    initialLevel: skillDetailValue.INITIAL_LEVEL,
                    numTimesIncreased: skillDetailValue.NUM_TIMES_INCREASED,
                    levelFromAttributes: skillDetailValue.LEVEL_FROM_ATTRIBUTES,
                    currentLevel: skillDetailValue.CURRENT_LEVEL,
                    xpSpent: skillDetailValue.XP_SPENT,
                    skillAdvancementClass: skillDetailValue.SKILL_ADVANCEMENT_CLASS_NAME
                });
            }

            for (const attribute2DetailValue of values[3]) {
                propRecord.enrichedAttribute2ndDetails.push({
                    name: attribute2DetailValue.PROPERTY_NAME,
                    initialLevel: attribute2DetailValue.INITIAL_LEVEL,
                    numTimesIncreased: attribute2DetailValue.NUM_TIMES_INCREASED,
                    xpSpent: attribute2DetailValue.XP_SPENT,
                    currentLevel: attribute2DetailValue.CURRENT_LEVEL,
                    currentLevelWithEnchantments: attribute2DetailValue.CURRENT_LEVEL_WITH_ENCHANTMENTS
                });
            }

            parsed.push(propRecord as CharacterDetail);
        }
    }

    return parsed;
}
