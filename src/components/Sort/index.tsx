import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/ProductSlice";
import { setSortType } from "../../redux/slices/SortSlice";

export const Sort = () => {
  const filter = useSelector((state: any) => state.filter);
  const sortValue = useSelector((state: any) => state.sort.sortType);

  const dispatch = useAppDispatch();
  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setSortType(event.target.value));
    dispatch(fetchProducts({ filter, sort: event.target.value }));
  };

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <Select
        value={sortValue}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Sort products" }}
        size="small"
      >
        <MenuItem value="">
          <em>Sort by</em>
        </MenuItem>
        <MenuItem value="price-asc">Price: Low to High</MenuItem>
        <MenuItem value="price-desc">Price: High to Low</MenuItem>
        <MenuItem value="rating-asc">Rating: High to Low</MenuItem>
        <MenuItem value="rating-desc">Rating: Low to High</MenuItem>
        <MenuItem value="name-asc">Name: A to Z</MenuItem>
        <MenuItem value="name-desc">Name: Z to A</MenuItem>
      </Select>
    </FormControl>
  );
};
