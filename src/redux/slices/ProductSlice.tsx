
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FilterState } from './FilterSlice';
import { Search } from '@mui/icons-material';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface GridState {
  products: Product[];
  searchedProducts: Product[],
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  }
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: GridState = {
  products: [],
  searchedProducts: [],
  pagination: {
    page: 0,
    pageSize: 0,
    total: 0
  },
  status: 'idle',
  error: null
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page , pageSize, filter, sort }: { page?: number; pageSize?: number, filter?: FilterState, sort?: string }) => {
    const filterData = filter && JSON.stringify(filter);
      const response = await axios.get('/api/products', {
        params: {
          page,
          pageSize,
          filter: filterData,
          sort
        }
      });
    
    return response.data;
  }
);

export const fetchSearchedProducts = createAsyncThunk(
  'products/fetchSearchedProducts',
  async (searchTerm: string) => {
    const response = await axios.get('/api/products/search', {
      params: {
        search: searchTerm
      }
    });
    return response.data;
  }
);

const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchSearchedProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSearchedProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchedProducts = action.payload.products;
      })
      .addCase(fetchSearchedProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
  },
});

export default ProductSlice.reducer;
