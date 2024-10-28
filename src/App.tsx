import React, { useCallback, useEffect } from "react";
import "./App.css";

import {
  Box,
  Button,
  createTheme,
  Dialog,
  ThemeProvider,
} from "@mui/material";
import { Sort } from "./components/Sort";
import Header from "./components/Header";
import Filter from "./components/Filter";
import { makeServer } from "./fakeApis";
import ProductsGrid from "./components/Grid";
import ProductPage from "./page/Products";
import { Route, Routes } from "react-router-dom";
import SearchedProducts from "./page/SearchedProducts";

makeServer();

declare module "@mui/system" {
  interface BreakpointOverrides {
    // Your custom breakpoints
    laptop: true;
    tablet: true;
    mobile: true;
    desktop: true;
    // Remove default breakpoints
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
  }
}

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#efa902",
      },
      secondary: {
        main: "#000000",
      },
    },
    breakpoints: {
      values: {
        laptop: 1024,
        tablet: 640,
        mobile: 0,
        desktop: 1280,
      },
    },
  });



  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/search" element={<SearchedProducts />} />
        </Routes>

      </div>
    </ThemeProvider>
  );
}

export default App;
