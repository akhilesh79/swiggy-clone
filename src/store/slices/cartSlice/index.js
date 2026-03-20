import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        // Update quantity and price
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + (action.payload.price ?? action.payload.defaultPrice) / 100,
        };
      } else {
        const newItem = {
          ...state,
          items: [
            ...state.items,
            { ...action.payload, quantity: 1, price: action.payload.price ?? action.payload.defaultPrice },
          ],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + (action.payload.price ?? action.payload.defaultPrice) / 100,
        };

        return newItem;
      }
    },
    removeItem: (state, action) => {
      const itemToRemove = state.items.find((item) => item.id === action.payload);
      if (!itemToRemove) return state;

      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice: state.totalPrice - (itemToRemove.price / 100) * itemToRemove.quantity,
      };
    },
    updateQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (!item) return state;
      const quantityDiff = action.payload.quantity - item.quantity;
      const priceDiff = (item.price / 100) * quantityDiff;
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.id !== action.payload.id),
          totalItems: state.totalItems + quantityDiff,
          totalPrice: state.totalPrice + priceDiff,
        };
      }

      return {
        ...state,
        items: state.items.map((i) => (i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i)),
        totalItems: state.totalItems + quantityDiff,
        totalPrice: state.totalPrice + priceDiff,
      };
    },
    clearCart: (state) => {
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      };
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
