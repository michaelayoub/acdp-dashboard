import { pushQuery } from '$lib/db/KsqlClient';
import { QUERY as CHARACTER_DETAILS_QUERY, processCharacterDetailsChunk } from '$lib/model/queries/CharacterDetails';
import type { ReadableStream } from 'node:stream/web';
import { event } from 'sveltekit-sse';

export async function GET({ params }) {
    const objectId = params.objectId;

    const characterDetailResponse = await pushQuery(CHARACTER_DETAILS_QUERY, { objectId });

    return event(async emit => {
        for await (const chunk of characterDetailResponse.body as ReadableStream<Uint8Array>) {
            const result = processCharacterDetailsChunk(chunk);
            for (const characterDetail of result) {
                emit(JSON.stringify(characterDetail));
            }
        }
    }).toResponse();
}
