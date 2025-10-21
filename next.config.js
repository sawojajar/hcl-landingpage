/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
  reactStrictMode: true,
  publicRuntimeConfig: {
    enableIndexingSeo: process.env.ENABLE_INDEXING_SEO,
    adminWhatsAppNumber: process.env.ADMIN_WHATSAPP_NUMBER,
    adminWhatsAppChatFormat: process.env.ADMIN_WHATSAPP_CHAT_FORMAT,
    firstCategory: process.env.FIRST_CATEGORY || 'Agrikultur',
    baseUrl: process.env.BASE_URL || 'https://pompahcl.com',
  },
  async rewrites() {
    return [
      { source: "/sitemap.xml", destination: "/api/sitemap.xml" },
      { source: "/sitemap/:id.xml", destination: "/api/sitemap/[id].ts" },
    ];
  },
}

module.exports = nextConfig
