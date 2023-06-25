import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isCartOpen: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        cartOpenHandler(state) {
            state.isCartOpen = !state.isCartOpen;
        }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;