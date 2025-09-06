/** @type {import('next').NextConfig} */
const nextConfig = {
    // 🌐 Configuración de dominios de imágenes permitidos
    images: {
        domains: ['images.unsplash.com'],
    },
    // �️ Configuración del runtime de Edge
    experimental: {
        runtime: 'edge',
    },
    // 🌍 Variables de entorno disponibles en el cliente
    env: {
        MONGODB_URI: process.env.MONGODB_URI,
        UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
    },

    eslint: {
        // ⚠️ Ignorar errores de ESLint durante la compilación
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
