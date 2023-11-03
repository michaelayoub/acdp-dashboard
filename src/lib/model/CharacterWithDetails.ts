import type { CharacterDetail } from "./queries/CharacterDetails";
import { updateWithIntProps as originalUpdateWithIntProps } from "./MinimalCharacter";
import { updateWithStringProps as originalUpdateWithStringProps } from "./MinimalCharacter";
import type { MinimalCharacterIntProperties } from "./queries/MinimalCharacterIntProperties";
import type { MinimalCharacterStringProperties } from "./queries/MinimalCharacterStringProperties";
import { startCase } from "lodash";
import type { PositionEnrichedProperties } from "./queries/PositionEnrichedProperties";

export type Attribute2nd = {
    Name: string;
    InitialLevel: number;
    NumTimesIncreased: number;
    XPSpent: number;
    CurrentLevel: number;
    CurrentLevelWithEnchantments: number;
};

export type Attribute = {
    Name: string;
    InitialLevel: number;
    NumTimesIncreased: number;
    XPSpent: number;
    CurrentLevel: number;
};

export type Skill = {
    Name: string;
    InitialLevel: number;
    NumTimesIncreased: number;
    LevelFromAttributes: number;
    CurrentLevel: number;
    XPSpent: number;
    SkillAdvancementClass: string;
};

export type CharacterWithDetails = {
    ObjectID: number;
    CharacterName: string;
    Sex?: string;
    HeritageGroup?: string;
    Template?: string;
    DateOfBirth?: string;
    CurrentLevel?: number;
    CurrentTitle?: string;
    CreatureKills?: number;
    NumDeaths?: number;
    LocationCoordinates?: string;
    Location?: string;
    LocationNearestFivePOIs?: string[];
    LastOutsideDeathCoordinates?: string;
    LastOutsideDeathLocation?: string;
    SecondaryAttributes?: Attribute2nd[];
    Attributes?: Attribute[];
    Skills?: Skill[];
};

export function updateWithIntProps(character: CharacterWithDetails, props: MinimalCharacterIntProperties) {
    originalUpdateWithIntProps(character, props);
}

export function updateWithStringProps(character: CharacterWithDetails, props: MinimalCharacterStringProperties) {
    originalUpdateWithStringProps(character, props);
}

export function updateWithPosProps(character: CharacterWithDetails, props: PositionEnrichedProperties) {
    if (character.CharacterName !== props.characterName) {
        character.CharacterName = props.characterName;
    }
    switch (props.propertyName) {
        case 'Location':
            character.Location = `${props.objCellId.toString(16)} [${props.originX} ${props.originY} ${props.originZ}]`.toUpperCase();
            character.LocationNearestFivePOIs = props.fiveNearestPOIs;
            character.LocationCoordinates = props.coordinates;
            break;
        case 'LastOutsideDeath':
            character.LastOutsideDeathLocation = `${props.objCellId.toString(16)} [${props.originX} ${props.originY} ${props.originZ}]`.toUpperCase();
            character.LastOutsideDeathCoordinates = props.coordinates;
            break;
    }
    console.log('Updated character data', character);
}

export function updateWithDetails(character: CharacterWithDetails, props: CharacterDetail) {
    character.Attributes = props.attributeDetails.map(a => ({
        Name: startCase(a.name.toLowerCase()),
        InitialLevel: a.initialLevel,
        CurrentLevel: a.currentLevel,
        NumTimesIncreased: a.numTimesIncreased,
        XPSpent: a.xpSpent
    } as Attribute));

    character.SecondaryAttributes = props.enrichedAttribute2ndDetails.map(a => ({
        Name: a.name.replace("Max", ""),
        InitialLevel: a.initialLevel,
        CurrentLevel: a.currentLevel,
        NumTimesIncreased: a.numTimesIncreased,
        XPSpent: a.xpSpent,
        CurrentLevelWithEnchantments: a.currentLevelWithEnchantments
    } as Attribute2nd));

    character.Skills = props.enrichedSkillDetails.map(a => ({
        Name: a.name.replace(/([A-Z])/g, ' $1').trim(),
        InitialLevel: a.initialLevel,
        CurrentLevel: a.currentLevel,
        LevelFromAttributes: a.levelFromAttributes,
        NumTimesIncreased: a.numTimesIncreased,
        SkillAdvancementClass: a.skillAdvancementClass,
        XPSpent: a.xpSpent
    } as Skill));
}