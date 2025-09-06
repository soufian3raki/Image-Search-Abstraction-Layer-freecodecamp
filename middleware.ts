// 🔒 Middleware para configurar CORS y seguridad
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 🌍 Configuración de CORS
export function middleware(request: NextRequest) {
  // ✅ Verificar el método de la solicitud
  const requestMethod = request.method.toUpperCase()
  
  // 🛡️ Configurar cabeceras CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400', // 24 horas
  }

  // ✨ Si es una solicitud OPTIONS (preflight), devolver 200 OK
  if (requestMethod === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders,
    })
  }

  // 🔄 Para solicitudes normales, añadir cabeceras CORS
  const response = NextResponse.next()
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

// 🎯 Configurar qué rutas deben usar el middleware
export const config = {
  matcher: '/api/:path*',
}
