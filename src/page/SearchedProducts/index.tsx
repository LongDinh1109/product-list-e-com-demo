import React from "react";
import { Container, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector, useQuery } from "../../app/hooks";
import ProductsGrid from "../../components/Grid";
import { addToCart } from "../../redux/slices/CartSlice";
const SearchedProducts: React.FC = () => {
  const query = useQuery();
  const searchedProducts = useAppSelector(
    (state) => state.grid.searchedProducts
  );
  const dispatch = useAppDispatch();
  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Search Results for: {query.get("q")}
      </Typography>
      <ProductsGrid
        products={searchedProducts}
        status="succeed"
        handleAddToCart={handleAddToCart}
      />
    </Container>
  );
};

export default SearchedProducts;
