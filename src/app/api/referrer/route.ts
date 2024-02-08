export async function GET(request: Request) {
    const headers = request.headers;
    console.log(headers.get('host'));

    return new Response(JSON.stringify({request:request}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
