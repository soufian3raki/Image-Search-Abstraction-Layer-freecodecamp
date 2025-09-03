// 🔧 Script de inicialización de la base de datos
import { connectDB } from './mongodb';
import { SearchQuery } from '../app/models/SearchQuery';

async function initDB() {
  try {
    // 🔌 Conectar a MongoDB
    const mongoose = await connectDB();
    console.log('✅ Conexión a MongoDB establecida');

    // 🧹 Limpiar colección existente
    await SearchQuery.deleteMany({});
    console.log('🗑️ Colección de búsquedas limpiada');

    // 📝 Crear algunos registros de ejemplo
    const sampleSearches = [
      { query: 'paisajes naturales' },
      { query: 'animales salvajes' },
      { query: 'ciudades nocturnas' },
    ];

    await SearchQuery.insertMany(sampleSearches);
    console.log('✨ Datos de ejemplo insertados');

    // 🔚 Cerrar conexión
    await mongoose.disconnect();
    console.log('👋 Conexión cerrada');

  } catch (error) {
    console.error('❌ Error durante la inicialización:', error);
    process.exit(1);
  }
}

// 🚀 Ejecutar inicialización
initDB();
