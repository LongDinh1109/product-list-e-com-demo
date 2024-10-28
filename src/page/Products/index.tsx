import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  TablePagination,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { Sort } from "../../components/Sort";
import Filter from "../../components/Filter";
import ProductsGrid from "../../components/Grid";
import { fetchProducts } from "../../redux/slices/ProductSlice";
import { addToCart } from "../../redux/slices/CartSlice";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ProductPage = (): React.ReactElement => {
  const { products, pagination, status } = useSelector(
    (state: RootState) => state.grid
  );
  const filter = useSelector((state: RootState) => state.filter);
  const sort = useSelector((state: RootState) => state.sort.sortType);

  //pagination
  const dispatch = useAppDispatch();
  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(
      fetchProducts({
        page: newPage + 1,
        pageSize: pagination.pageSize,
        filter,
        sort,
      })
    );
  };

  const handleChangeRowsPerPage = (event: any) => {
    dispatch(
      fetchProducts({
        page: 1,
        pageSize: event.target.value,
        filter,
        sort,
      })
    );
  };

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };
  //handle  open filter
  const [open, setOpen] = React.useState(false);

  const handleOpenFilter = () => {
    setOpen(true);
  };
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <Box
        sx={{
          m: { mobile: 1, tablet: 2, laptop: 3 },
          display: "flex",
          justifyContent: {
            mobile: "space-between",
            tablet: "space-between",
            laptop: "end",
          },
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            display: { mobile: "block", tablet: "block", laptop: "none" },
          }}
          onClick={handleOpenFilter}
        >
          Filter
        </Button>
        <Sort />
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            // flexGrow: 1,
            display: { mobile: "none", tablet: "none", laptop: "block" },
            // width: "200px"
          }}
        >
          <Filter />
        </Box>
        <Box sx={{ m: { mobile: 1, tablet: 2, laptop: 3 }, flexGrow: 1 }}>
          {status === "loading" && <CircularProgress />}
          <ProductsGrid
            products={products}
            status={status}
            handleAddToCart={handleAddToCart}
          />
          <TablePagination
            component="div"
            count={pagination.total}
            page={pagination.page - 1}
            onPageChange={handleChangePage}
            rowsPerPage={pagination.pageSize}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <Filter onClose={handleClose} />
      </Dialog>
    </>
  );
};
export default ProductPage;
