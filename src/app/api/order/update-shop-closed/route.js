import { NextResponse } from "next/server"

export async function PUT(request) {
    try {
        const body = await request.json();

        const bodyToSend = {
            how_long_closed: body.how_long_closed,
            is_changed: body.is_changed,
            new_phone_number: body.new_phone_number,
            is_moved: body.is_moved,
            new_store_name: body.new_store_name,
            new_store_address: body.new_store_address,
            relative_name: body.relative_name,
            relative_phone_number: body.relative_phone_number,
            owner_address: body.owner_address
        }

        // Forward request to the external API
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_TEST}/update-shop-closed/${body.order_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${body.token}`
            },
            body: JSON.stringify(bodyToSend),
        });
        const data = await response.json();
      
          // Return response back to the client
        return new Response(JSON.stringify(data), {
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