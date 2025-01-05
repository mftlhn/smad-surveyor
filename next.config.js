const withPWA = require('next-pwa')({
    dest: 'public', // Folder output untuk file service worker
    disable: process.env.NODE_ENV === 'development', // Nonaktifkan PWA saat development
  });
  
  module.exports = withPWA({
    // Konfigurasi Next.js lainnya
    reactStrictMode: true,
});  