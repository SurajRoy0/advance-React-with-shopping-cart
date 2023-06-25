import { createSlice } from "@reduxjs/toolkit";
import { addCartItems, fetchCartItems } from "./Api";

const initialState = {
    isCartOpen: false,
    items: [],
    requestStatus: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        cartOpenHandler(state) {
            state.isCartOpen = !state.isCartOpen;
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + existingItem.price
            } else {
                state.items.push({
                    id: newItem.id,
                    title: newItem.title,
                    price: newItem.price,
                    totalPrice: newItem.price,
                    quantity: 1
                })
            }
        },

        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id)
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartItems.fulfilled, (state, action) => {
            state.items = action.payload ? action.payload : [];
        });
        builder.addCase(addCartItems.pending, (state, action) => {
            state.requestStatus = {
                status: 'pending',
                action: 'Wait!',
                message: 'Sending items!'
            }
        });
        builder.addCase(addCartItems.fulfilled, (state, action) => {
            state.requestStatus = {
                status: 'success',
                action: 'Successfull!',
                message: 'Items sent!'
            }
        });
        builder.addCase(addCartItems.rejected, (state, action) => {
            state.requestStatus = {
                status: 'error',
                action: 'Failed!',
                message: 'Sending Failed!'
            }
        });
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;