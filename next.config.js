/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    enableIndexingSeo: process.env.ENABLE_INDEXING_SEO,
    adminWhatsAppNumber: process.env.ADMIN_WHATSAPP_NUMBER,
    adminWhatsAppChatFormat: process.env.ADMIN_WHATSAPP_CHAT_FORMAT,
    firstCategory: 'Agrikultur' || process.env.FIRST_CATEGORY,
  },
}

module.exports = nextConfig
