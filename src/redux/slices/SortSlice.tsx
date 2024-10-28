import { createSlice } from "@reduxjs/toolkit";

export interface SortState {
  sortType: "" | "price-asc" | "price-desc" | "rating-desc" | "rating-desc" | "name-asc" | "name-desc";
}
export const initialState : SortState = {
  sortType: "",
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

export const { setSortType } = sortSlice.actions;

export default sortSlice.reducer;
