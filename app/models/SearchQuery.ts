import mongoose from 'mongoose';

// 📝 Definición del esquema para almacenar las búsquedas de imágenes
const searchQuerySchema = new mongoose.Schema({
  // 🔍 Término de búsqueda ingresado por el usuario
  query: {
    type: String,
    required: true,
  },
  // ⏰ Fecha y hora en que se realizó la búsqueda
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// 📦 Exportación del modelo (crea uno nuevo si no existe)
export const SearchQuery = mongoose.models.SearchQuery || mongoose.model('SearchQuery', searchQuerySchema);
