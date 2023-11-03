import type { MinimalCharacterIntProperties } from "./queries/MinimalCharacterIntProperties";
import type { MinimalCharacterStringProperties } from "./queries/MinimalCharacterStringProperties";

export type MinimalCharacter = {
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
};

export function updateWithIntProps(character: MinimalCharacter, props: MinimalCharacterIntProperties) {
    if (character.CharacterName !== props.characterName) {
        character.CharacterName = props.characterName;
    }
    switch(props.propertyName) {
        case 'Level':
            character.CurrentLevel = props.value;
            break;
        case 'CreatureKills':
            character.CreatureKills = props.value;
            break;
        case 'CharacterTitleId':
            character.CurrentTitle = props.valueLabel.replace(/([A-Z])/g, ' $1').trim();
            break;
        case 'NumDeaths':
            character.NumDeaths = props.value;
            break;
    }
    console.log('Updated character data', character);
}

export function updateWithStringProps(character: MinimalCharacter, props: MinimalCharacterStringProperties) {
    if (character.CharacterName !== props.characterName) {
        character.CharacterName = props.characterName;
    }
    switch (props.propertyName) {
        case 'Name':
            character.CharacterName = props.value;
            break;
        case 'Sex':
            character.Sex = props.value;
            break;
        case 'HeritageGroup':
            character.HeritageGroup = props.value;
            break;
        case 'Template':
            character.Template = props.value;
            break;
        case 'DateOfBirth':
            character.DateOfBirth = props.value;
            break;
    }
    console.log('Updated character data', character);
}