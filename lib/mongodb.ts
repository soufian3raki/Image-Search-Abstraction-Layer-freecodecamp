// 🔌 Utilidad para la conexión a MongoDB
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('🚫 Por favor define la variable de entorno MONGODB_URI');
}

// 🌐 Estado de la conexión
const cached: { mongoose: { conn: any; promise: Promise<typeof mongoose> | null } } = global as any;
cached.mongoose = cached.mongoose || { conn: null, promise: null };

// 🔄 Función para conectar a la base de datos
export async function connectDB() {
  if (cached.mongoose.conn) {
    return cached.mongoose.conn;
  }

  if (!cached.mongoose.promise) {
    const opts = {
      bufferCommands: true,
    };

    cached.mongoose.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.mongoose.conn = await cached.mongoose.promise;
  } catch (e) {
    cached.mongoose.promise = null;
    throw e;
  }

  return cached.mongoose.conn;
}
