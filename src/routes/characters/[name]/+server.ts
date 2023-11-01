import { event } from 'sveltekit-sse';
import { charactersArray, mutate } from '$lib/charactersArray';
import type { Character } from '$lib/model/Character';

const delay = (millis: number) => new Promise(r => setTimeout(r, millis));

export function GET({ params }) {
    const name = params.name;

    // deep copy
    // const characters: Character[] = JSON.parse(JSON.stringify(charactersArray));
    const filteredCharacter = charactersArray.filter((character) => character.name == name)[0];

    return event(async emit => {
        while (true) {
            mutate(filteredCharacter);
            emit(JSON.stringify(filteredCharacter));
            await delay(2_000);
        }
    }).toResponse();
}