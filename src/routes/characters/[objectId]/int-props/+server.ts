import { pushQuery } from "$lib/db/KsqlClient";
import { QUERY_PARAM as INT_PROPS_QUERY, processIntPropsChunk } from '$lib/model/queries/MinimalCharacterIntProperties';
import type { ReadableStream } from "node:stream/web";
import { event } from 'sveltekit-sse';

export async function GET({ params }) {
    const objectId = params.objectId;
    
    const intPropsResponse = await pushQuery(INT_PROPS_QUERY, { objectId });

    return event(async emit => {
        for await (const chunk of intPropsResponse.body as ReadableStream<Uint8Array>) {
            const result = processIntPropsChunk(chunk);
            for (const characterPropListing of result) {
                emit(JSON.stringify(characterPropListing));
            }
        }
    }).toResponse();
}
