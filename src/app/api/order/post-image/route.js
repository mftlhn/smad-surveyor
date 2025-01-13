import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { NextResponse } from "next/server"

export const config = {
    api: {
        bodyParser: false
    }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return res.status(200).json({ message: 'POST request successful!' });
  }

  res.setHeader('Allow', ['POST', 'GET']); // Tampilkan method yang diizinkan
  res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  // if (req.method === 'POST') {
  //   const form = new formidable.IncomingForm();
  //   const uploadDir = path.join(process.cwd(), '/public/uploads');

  //   if (!fs.existsSync(uploadDir)) {
  //     fs.mkdirSync(uploadDir, { recursive: true });
  //   }

  //   form.uploadDir = uploadDir;
  //   form.keepExtensions = true;
    
  //   form.parse(req, (err, fields, files) => {
  //     if (err) {
  //       console.error('Error parsing form data:', err);
  //       return res.status(500).json({ error: 'Error parsing form data' });
  //     }

  //     console.log('Fields:', fields);
  //     console.log('Files:', files);

  //     const { id_order, token, image_type } = fields;
  //     const file = files.image;

  //     if (!id_order || !token || !file || !image_type) {
  //       return res.status(400).json({ error: 'Missing required fields' });
  //     }

  //     res.status(200).json({
  //       message: 'Data received successfully!',
  //       fields,
  //       fileInfo: {
  //         originalFilename: file.originalFilename,
  //         filepath: file.filepath,
  //         size: file.size,
  //       },
  //     });
  //   });
  // } else {
  //   res.status(405).json({ error: 'Method not allowed' });
  // }
}