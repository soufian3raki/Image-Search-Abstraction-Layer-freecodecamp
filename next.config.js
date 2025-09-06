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
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET' },
                ],
            },
        ];
    },

    eslint: {
        // ⚠️ Ignorar errores de ESLint durante la compilación
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
