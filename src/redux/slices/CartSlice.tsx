import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
      }

      state.totalQuantity++;
      state.totalAmount += newItem.price;
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
        }
        state.totalQuantity--;
        state.totalAmount -= existingItem.price;
      }
    },

    clearFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.items = state.items.filter((item) => item.id !== id);
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, clearFromCart } = cartSlice.actions;
export default cartSlice.reducer;
