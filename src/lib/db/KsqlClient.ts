const url = (process.env["KSQL_URI"] || "http://127.0.0.1:8088") + "/query-stream";

const headers = new Headers();
headers.append("Accept", "application/vnd.ksqlapi.delimited.v1");

export async function pushQuery(query: string): Promise<Response> {
    const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({ sql: query, streamsProperties: { "ksql.query.push.v2.enabled": true } })
    });

    return response;
}
