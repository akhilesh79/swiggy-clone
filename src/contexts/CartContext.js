import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        // If item exists, increase quantity
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + (action.payload.price ?? action.payload.defaultPrice) / 100,
        };
      } else {
        // Add new item
        const newItem = {
          ...action.payload,
          quantity: 1,
          price: action.payload.price ?? action.payload.defaultPrice,
        };
        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + newItem.price / 100,
        };
      }
    }

    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find((item) => item.id === action.payload);
      if (!itemToRemove) return state;

      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice: state.totalPrice - (itemToRemove.price / 100) * itemToRemove.quantity,
      };
    }

    case 'UPDATE_QUANTITY': {
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
    }

    case 'CLEAR_CART': {
      return initialState;
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value = {
    items: cartState.items,
    totalItems: cartState.totalItems,
    totalPrice: cartState.totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
