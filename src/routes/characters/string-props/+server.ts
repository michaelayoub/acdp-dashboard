import { pushQuery } from '$lib/db/KsqlClient';
import { QUERY as STRING_PROPS_QUERY, processStringPropsChunk } from '$lib/model/queries/MinimalCharacterStringProperties';
import type { ReadableStream } from 'node:stream/web';
import { event } from 'sveltekit-sse';

export async function GET() {
    const stringPropsResponse = await pushQuery(STRING_PROPS_QUERY);

    return event(async emit => {
        for await (const chunk of stringPropsResponse.body as ReadableStream<Uint8Array>) {
            const result = processStringPropsChunk(chunk);
            for (const characterPropListing of result) {
                emit(JSON.stringify(characterPropListing));
            }
        }
    }).toResponse();
}
