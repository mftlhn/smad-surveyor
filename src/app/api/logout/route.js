export async function POST(request) {
    try {
        const body = await request.json();
    
        // Forward request to the external API
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_TEST}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${body.token}`
            },
        });
    
        const data = await response.json();
    
        // Return response back to the client
        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Internal Server Error', error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}