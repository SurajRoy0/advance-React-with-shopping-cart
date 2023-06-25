import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCartItems = createAsyncThunk('fetchCartItem', async () => {
    try {
        const res = await fetch('https://advance-redux-practice-default-rtdb.firebaseio.com/cart.json');
        if (!res.ok) {
            throw new Error('Failed to fetch cart items.');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
});

export const addCartItems = createAsyncThunk('addCartItem', async ({ items }) => {
    try {
        const res = await fetch('https://advance-redux-practice-default-rtdb.firebaseio.com/cart.json', {
            method: 'PUT',
            body: JSON.stringify(items)
        });
        if (!res.ok) {
            throw new Error('Failed to add cart items.');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
});
