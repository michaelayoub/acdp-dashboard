import { pushQuery } from "$lib/db/KsqlClient";
import { QUERY_PARAM as POS_PROPS_QUERY, processPosPropsChunk } from '$lib/model/queries/PositionEnrichedProperties';
import type { ReadableStream } from "node:stream/web";
import { event } from 'sveltekit-sse';

export async function GET({ params }) {
    const objectId = params.objectId;
    const posPropsResponse = await pushQuery(POS_PROPS_QUERY, { objectId });

    return event(async emit => {
        for await (const chunk of posPropsResponse.body as ReadableStream<Uint8Array>) {
            const result = processPosPropsChunk(chunk);
            for (const characterPropListing of result) {
                emit(JSON.stringify(characterPropListing));
            }
        }
    }).toResponse();
}