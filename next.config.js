/** @type {import('next').NextConfig} */
const nextConfig = {
    // 🌐 Configuración de dominios de imágenes permitidos
    images: {
        domains: ['images.unsplash.com'],
    },
    // 🔒 Configuración de seguridad de API
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS' },
                    { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
                ],
            },
        ];
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
