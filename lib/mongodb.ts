/**
 * 🔌 Utilidad para la conexión a MongoDB
 * Este módulo proporciona una conexión optimizada y cacheada a MongoDB
 * utilizando Mongoose como ORM.
 */
import mongoose from 'mongoose';

// 🔑 Verificación de la URI de conexión
const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('🚫 Por favor define la variable de entorno MONGODB_URI');
}

/**
 * 🌐 Estado de la conexión
 * Almacenamos la conexión en una variable global para reutilizarla
 * entre diferentes llamadas a la API, mejorando el rendimiento.
 */
// Define el tipo para el objeto global
interface GlobalWithMongoose extends Global {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Usar el tipo correcto para el objeto cached
const cached = (global as unknown as GlobalWithMongoose);
cached.mongoose = cached.mongoose || { conn: null, promise: null };

/**
 * 🔄 Función para conectar a la base de datos
 * Esta función implementa un patrón singleton para la conexión a MongoDB:
 * - Reutiliza una conexión existente si está disponible
 * - Crea una nueva conexión si no existe ninguna
 * - Maneja reconexiones automáticamente
 * @returns Promise<typeof mongoose>
 */
export async function connectDB() {
  // ♻️ Retornar conexión existente si está disponible
  if (cached.mongoose.conn) {
    return cached.mongoose.conn;
  }

  // 🆕 Crear nueva conexión si no hay una promesa pendiente
  if (!cached.mongoose.promise) {
    const opts = {
      bufferCommands: true, // Permite comandos mientras se establece la conexión
    };

    cached.mongoose.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });

  }

  try {
    // ✅ Esperar a que se complete la conexión
    cached.mongoose.conn = await cached.mongoose.promise;
  } catch (e) {
    // ❌ Resetear la promesa en caso de error
    cached.mongoose.promise = null;
    throw e;
  }

  return cached.mongoose.conn;
}
