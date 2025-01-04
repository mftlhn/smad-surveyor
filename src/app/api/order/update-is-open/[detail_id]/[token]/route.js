import { NextResponse } from "next/server"

export async function PUT(request, { params }) {
    const detail_id = (await params).detail_id
    const token = (await params).token

    try {
        // Forward request to the external API
        // const cookies = request.headers.get('cookie')
        // const parsedCookies = cookies ? cookie.parse(cookies) : {}
        // const cookieToken = parsedCookies['smad-token']

        // Pastikan cookieToken tersedia
        if (!token) {
            return new NextResponse(
            JSON.stringify({ message: 'Unauthorized: Token not found' }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const body = await request.json();    
    
        // Forward request to the external API
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_TEST}/update-is-open/${detail_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(body),
        });
    
        const data = await response.json();
    
        // Return response back to the client
        return new Response(JSON.stringify(data), {
          status: response.status,
          headers: { 'Content-Type': 'application/json' },
        });
        // return redirect(`/order/${detail_id}`);
      } catch (error) {
        return new Response(
          JSON.stringify({ message: 'Internal Server Error', error: error.message }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
}