import { createApi } from 'unsplash-js';
import { connectDB } from '@/app/lib/db';
import { SearchQuery } from '@/app/models/SearchQuery';
import { NextResponse } from 'next/server';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY || '',
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const page = Number(searchParams.get('page')) || 1;

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    // Conectar a la base de datos
    await connectDB();

    // Guardar la búsqueda
    await SearchQuery.create({ query });

    // Realizar la búsqueda en Unsplash
    const result = await unsplash.search.getPhotos({
      query,
      page,
      perPage: 10,
    });

    if (!result.response) {
      throw new Error('Failed to fetch images');
    }

    // Transformar los resultados al formato deseado
    const images = result.response.results.map(img => ({
      url: img.urls.regular,
      description: img.description || img.alt_description,
      pageUrl: img.links.html,
    }));

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
