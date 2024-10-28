import React, { useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector } from "react-redux";
import { addToCart, CartState, clearFromCart, removeFromCart } from "../../redux/slices/CartSlice";
import { useAppDispatch } from "../../app/hooks";

interface ShoppingCartProps {
  onClose: () => void;
}

const ShoppingCartPage = ({ onClose }: ShoppingCartProps) => {
  const { items, totalAmount } = useSelector(
    (state: { cart: CartState }) => state.cart
  );  

  const dispatch = useAppDispatch();

  const handleIncreaseQuantity = (item : any) => {
    dispatch(addToCart(item));
  };

  const handleDecreaseQuantity = (id : number) => {
    dispatch(removeFromCart(id));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(clearFromCart(id));
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", height: "100vh" }}>
      <Box
        sx={{
          padding: 2,
          width: { mobie: "90%", laptop: "50%" },
          textAlign: "center",
        }}
      >
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h4" gutterBottom>
            Shopping Cart
          </Typography>
          {items.length === 0 ? (
            <Typography variant="body1">Your cart is empty</Typography>
          ) : (
            <>
              <List>
                {items.map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={item.title}
                        secondary={`$${item.price}`}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mr: 2,
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => handleDecreaseQuantity(item.id)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton
                          size="small"
                          data-testid="increase-quantity-button"
                          onClick={() => handleIncreaseQuantity(item)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ mt: 2, textAlign: "right" }}>
                <Typography variant="h6" gutterBottom>
                  Total: ${totalAmount.toFixed(2)}
                </Typography>
                <Button variant="contained" color="primary" onClick={()=>alert("Checkout is not implemented yet")}>
                  Checkout
                </Button>
              </Box>
            </>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={onClose}
            sx={{ mt: 2 }}
          >
            Close Cart
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default ShoppingCartPage;
