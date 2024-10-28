import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  category: string;
  price: string|Array<number>;
  rating: string|number;
}

export const initialState: FilterState = {
  category: 'all',
  price: 'all',
  rating: 'all',
};

const FilterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    setFilter: (state: FilterState, action: PayloadAction<FilterState>) => {
      state.category = action.payload.category;
      state.price = action.payload.price;
      state.rating = action.payload.rating;
    },
  },
});

export const { setFilter } = FilterSlice.actions;
export default FilterSlice.reducer;