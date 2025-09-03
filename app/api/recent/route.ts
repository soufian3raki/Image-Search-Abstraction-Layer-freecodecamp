import { connectDB } from '@/app/lib/db';
import { SearchQuery } from '@/app/models/SearchQuery';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    
    const recentSearches = await SearchQuery.find()
      .sort({ timestamp: -1 })
      .limit(10)
      .select('query timestamp -_id');

    return NextResponse.json(recentSearches);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch recent searches' }, { status: 500 });
  }
}
