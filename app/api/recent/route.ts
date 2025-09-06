import { connectDB } from '@/app/lib/db';
import { SearchQuery } from '@/app/models/SearchQuery';
import { NextResponse } from 'next/server';

export async function GET() {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };
    try {
        await connectDB();

        const recentSearches = await SearchQuery.find()
            .sort({ timestamp: -1 })
            .limit(10)
            .select('query timestamp -_id');

        return NextResponse.json({
            status: 'success',
            data: recentSearches
        }, { headers });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            status: 'error',
            error: 'Failed to fetch recent searches'
        }, {
            status: 500,
            headers
        });
    }
}
