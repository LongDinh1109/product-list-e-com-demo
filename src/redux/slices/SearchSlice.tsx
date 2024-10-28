
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  searchTerm: string;
  searchResults: any[];
}

const initialState: SearchState = {
  searchTerm: '',
  searchResults: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<any[]>) => {
      state.searchResults = action.payload;
    },
    clearSearch: (state) => {
      state.searchTerm = '';
      state.searchResults = [];
    },
  },
});

export const { setSearchTerm, setSearchResults, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
