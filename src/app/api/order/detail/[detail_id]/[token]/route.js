import { NextResponse } from "next/server"
import cookie from 'cookie'

export async function GET(req, { params }) {
    const detail_id = (await params).detail_id
    const token = (await params).token

    try {    
        // Forward request to the external API
        // const cookies = req.headers.get('cookie')
        // const parsedCookies = cookies ? cookie.parse(cookies) : {}
        // const cookieToken = parsedCookies['smad-token']
        // const cookieToken = localStorage.getItem('smad-token')

        // Pastikan cookieToken tersedia
        if (!token) {
            return new NextResponse(
            JSON.stringify({ message: 'Unauthorized: Token not found' }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_TEST}/detail/${detail_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
    
        // const data = await response.json();
        const data = await response.json();
    
        // Return response back to the client
        // const data = {
        //     request: request.cookies,
        // }

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