// // pages/api/login.js
// export default async function handler(req, res) {
//     if (req.method !== 'POST') {
//       return res.status(405).json({ message: 'Method Not Allowed' });
//     }
  
//     try {
//       // Meneruskan request ke server API HTTP
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_TEST}/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(req.body), // Meneruskan data body dari client
//       });
  
//       const data = await response.json();
  
//       // Meneruskan response kembali ke client
//       return res.status(response.status).json(data);
//     } catch (error) {
//       return res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
// }
  
export async function POST(request) {
    try {
      const body = await request.json();
  
      // Forward request to the external API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_TEST}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
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
  