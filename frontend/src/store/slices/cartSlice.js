import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/orders/cart';

// Get cart from localStorage
const cart = JSON.parse(localStorage.getItem('cart'));

const initialState = {
  cartItems: cart ? cart : [],
  isLoading: false,
  isError: false,
  message: '',
};

// Get cart
export const getCart = createAsyncThunk('cart/getCart', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const cartItems = response.data.items.map(item => ({
      product: item.product,
      quantity: item.quantity,
    }));
    localStorage.setItem('cart', JSON.stringify(cartItems));
    return cartItems;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Add to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await axios.post(
        API_URL,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const cartItems = response.data.items.map(item => ({
        product: item.product,
        quantity: item.quantity,
      }));
      localStorage.setItem('cart', JSON.stringify(cartItems));
      return cartItems;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update cart
export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await axios.put(
        API_URL,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const cartItems = response.data.items.map(item => ({
        product: item.product,
        quantity: item.quantity,
      }));
      localStorage.setItem('cart', JSON.stringify(cartItems));
      return cartItems;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Remove from cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await axios.delete(`${API_URL}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const cartItems = response.data.items.map(item => ({
        product: item.product,
        quantity: item.quantity,
      }));
      localStorage.setItem('cart', JSON.stringify(cartItems));
      return cartItems;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Clear cart
export const clearCart = createAsyncThunk('cart/clearCart', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    await axios.delete(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.removeItem('cart');
    return [];
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
    addToCartLocal: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.cartItems.find(
        item => item.product._id === product._id
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ product, quantity });
      }
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    removeFromCartLocal: (state, action) => {
      state.cartItems = state.cartItems.filter(
        item => item.product._id !== action.payload
      );
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    updateQuantityLocal: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cartItems.find(item => item.product._id === productId);
      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cartItems = [];
      });
  },
});

export const { reset, addToCartLocal, removeFromCartLocal, updateQuantityLocal } = cartSlice.actions;
export default cartSlice.reducer;
export const updateQuantity = updateQuantityLocal;

