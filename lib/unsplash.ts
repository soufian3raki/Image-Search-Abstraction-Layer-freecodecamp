// 📸 Servicio para interactuar con la API de Unsplash
import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';

// 🔑 Configuración de la API de Unsplash
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY!,
  fetch: nodeFetch as any,
});

// 🖼️ Interfaz para los resultados de la búsqueda
export interface SearchResult {
  id: string;
  description: string | null;
  urls: {
    regular: string;
  };
  links: {
    html: string;
  };
}

// 🔍 Función para buscar imágenes
export async function searchImages(query: string, page: number = 1): Promise<SearchResult[]> {
  try {
    const result = await unsplash.search.getPhotos({
      query,
      page,
      perPage: 10,
    });

    if (result.type === 'error') {
      throw new Error('Error al buscar imágenes en Unsplash');
    }

    return result.response.results.map(photo => ({
      id: photo.id,
      description: photo.description,
      urls: {
        regular: photo.urls.regular,
      },
      links: {
        html: photo.links.html,
      },
    }));
  } catch (error) {
    console.error('🚫 Error en la búsqueda de Unsplash:', error);
    throw error;
  }
}
