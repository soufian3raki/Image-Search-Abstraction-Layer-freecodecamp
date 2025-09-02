import mongoose from 'mongoose';

const searchQuerySchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const SearchQuery = mongoose.models.SearchQuery || mongoose.model('SearchQuery', searchQuerySchema);
