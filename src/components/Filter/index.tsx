import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  SelectChangeEvent,
  Slider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { fetchCategories } from "../../redux/slices/CategoriesSlice";
import { useSelector } from "react-redux";
import { CategoryInterface } from "../../redux/slices/CategoriesSlice";
import { fetchProducts } from "../../redux/slices/ProductSlice";
import { setFilter } from "../../redux/slices/FilterSlice";
import { setSortType } from "../../redux/slices/SortSlice";
interface FilterProps {
  onClose?: () => void;
}

function valuetext(value: number) {
  return `${value}°C`;
}

const minDistance = 0;

const StyledBtn = styled(Button)({
  backgroundColor: "#000",
  fontSize: "10px",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#000",
  },
});

const Filter = React.memo(({ onClose }: FilterProps) => {    
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categories: CategoryInterface[] = useSelector(
    (state: any) => state.category.categories
  );

  //filter
  const [filterValue, setFilterValue] = useState({
    category: "all",
    price: [0, 5000],
    rating: 0,
  });

  const handleChangeCategory = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setFilterValue({ ...filterValue, category: value });
    dispatch(setSortType(""));
  };

  const handleChangePrice = (event: any, newValue: any, activeThumb: any) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setFilterValue({
        ...filterValue,
        price: [
          Math.min(newValue[0], filterValue.price[1] - minDistance),
          filterValue.price[1],
        ],
      });
    } else {
      setFilterValue({
        ...filterValue,
        price: [
          filterValue.price[0],
          Math.max(newValue[1], filterValue.price[0] + minDistance),
        ],
      });
    }
  };

  const handleChangeRating = (event: any, newValue: any) => {
    setFilterValue({ ...filterValue, rating: newValue });
  };

  const handleApplyFilter = () => {
    dispatch(setFilter(filterValue));
    dispatch(fetchProducts({filter:filterValue}));
    onClose && onClose();
  };

  const handleResetFilter = () => {
    setFilterValue({
      category: "all",
      price: [0, 5000],
      rating: 0,
    });
    dispatch(setFilter({
      category: "all",
      price: [0, 5000],
      rating: 0,
    }));
    dispatch(fetchProducts({filter:{
      category: "all",
      price: [0, 5000],
      rating: 0,
    }}));
    onClose && onClose();
    // onClose && onClose();
  };

  return (
    <Box
      sx={{
        minWidth: 200,
        m: 2,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        border: "1px solid #ccc",
        p: 2,
        borderRadius: 2,
      }}
    >
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Filter Products
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="filter-label">Category</InputLabel>
          <Select
            labelId="filter-label"
            id="filter-select"
            value={filterValue.category}
            label="Category"
            onChange={handleChangeCategory}
          >
            <MenuItem value="all">All</MenuItem>
            {categories.length > 0 &&
              categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Price
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ border: "1px solid #ccc", p: 1, borderRadius: 1 }}
          >
            {filterValue.price[0]}
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ border: "1px solid #ccc", p: 1, borderRadius: 1 }}
          >
            {filterValue.price[1]}
          </Typography>
        </Box>
        <Slider
          // labelId="filter-label"
          getAriaLabel={() => "Minimum distance"}
          value={filterValue.price}
          onChange={handleChangePrice}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          disableSwap
          min={0}
          max={5000}
        />
      </Box>
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Rating
        </Typography>
        <Rating
          precision={0.5}
          value={filterValue.rating}
          onChange={handleChangeRating}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <StyledBtn onClick={handleApplyFilter}>Apply Filters</StyledBtn>
        <StyledBtn onClick={handleResetFilter}>Clear Filters</StyledBtn>
      </Box>
    </Box>
  );
});

export default Filter;
