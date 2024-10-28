import {
  AppBar,
  Badge,
  Dialog,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { Search as SearchIcon, ShoppingCart } from "@mui/icons-material";
import React from "react";
import ShoppingCartPage from "../ShoppingCart";
import { useSelector } from "react-redux";
import { useAppDispatch, useDebounce } from "../../app/hooks";
import { setSearchTerm } from "../../redux/slices/SearchSlice";
import { fetchSearchedProducts } from "../../redux/slices/ProductSlice";
import { Link, useNavigate } from "react-router-dom";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("laptop")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   right: 0,
// }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 0, 1, 1),
    // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("laptop")]: {
      width: "20ch",
    },
  },
}));

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const totalQuantity = useSelector((state: any) => state.cart.totalQuantity);

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");
  const dispatch = useAppDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleSearchChange = useDebounce((event: any) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  }, 500);

  const handleSearchProduct = () => {
    dispatch(fetchSearchedProducts(searchTerm));
    navigate(`/search?q=${searchTerm}`);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
        >
          <Link to='/' style={{ textDecoration: "none", color: "inherit" }}>
            E-commerce
          </Link>
        </Typography>
        <Search>
          <StyledInputBase
            placeholder="Search…"
            onChange={handleSearchChange}
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton children={<SearchIcon />} onClick={handleSearchProduct}></IconButton>
        </Search>
        <IconButton
          size="large"
          color="inherit"
          onClick={handleClickOpen}
          sx={{ ml: "auto" }}
        >
          <Badge badgeContent={totalQuantity} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        // TransitionComponent={Transition}
      >
        <ShoppingCartPage onClose={handleClose} />
      </Dialog>
    </AppBar>
  );
};

export default Header;
