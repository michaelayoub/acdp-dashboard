import { event } from 'sveltekit-sse';
import { charactersArray, mutate } from '$lib/charactersArray';

const delay = (millis: number) => new Promise(r => setTimeout(r, millis));

export function GET() {
    return event(async emit => {
        while (true) {
            charactersArray.forEach(mutate);
            emit(JSON.stringify(charactersArray));
            await delay(2_000);
        }
    }).toResponse();
}