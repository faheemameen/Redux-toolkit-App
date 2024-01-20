import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
import { openModal } from "../modal/modalSlice";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: cartItems,
  amount: 4,
  total: 0,
  isLoading: true,
};

//for asynchronous operation

//1st way
// export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
//   return fetch(url)
//     .then((resp) => resp.json())
//     .catch((err) => console.log(err));
// });

//2nd option
// export const getCartItems = createAsyncThunk(
//   "cart/getCartItems",
//   async (name, thunkAPI) => {
//     this is the parameter recived from dispatch
//     with thunkapi you have access of the state
//     try {
//        console.log(name);
//        console.log(thunkAPI);
//        console.log(thunkAPI.getState());
//        thunkAPI.dispatch(openModal())
//       const resp = await axios(url);
//       console.log(resp);
//       return resp.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue("Something went wrong");
//     }
//   }
// );

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []; //mutate the state directly (immer take care)
    },
    removeItem: (state, action) => {
      // console.log(action);
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
    //for asynchronous operation
    // extraReducers: {
    //   [getCartItems.pending]: (state) => {
    //     state.isLoading = true;
    //   },
    //   [getCartItems.fulfilled]: (state, action) => {
    //     console.log(action);
    //     state.isLoading = false;
    //     state.cartItems = action.payload;
    //   },
    //   [getCartItems.rejected]: (state, action) => {
    //     console.log(action); //when thunkapi with reject value
    //     state.isLoading = false;
    //   },
    // },
  },
});
// console.log(cartSlice)

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
