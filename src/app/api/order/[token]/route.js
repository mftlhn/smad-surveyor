import { NextResponse } from "next/server"

export async function GET(request, { params }) {
    const token = params

    try {    
        // Forward request to the external API
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_TEST}/ready-to-visit`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.token}`
          },
        });
    
        const data = await response.json();
        // const data = {
        //     request: request.cookies,
        // }
    
        // Return response back to the client
        return new NextResponse(JSON.stringify(data), {
          status: response.status,
          headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new NextResponse(
          JSON.stringify({ message: 'Internal Server Error', error: error.message }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}