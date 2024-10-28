import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface CategoryInterface {
  id: number;
  name: string;
}

export interface CategoriesState {
  categories: CategoryInterface[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  status: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await fetch("/api/categories");
    const data = await response.json();
    return data.data;
  }
);

const CategoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
         state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed"
      });
  },
});

export default CategoriesSlice.reducer;
