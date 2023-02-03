import { createSlice } from "@reduxjs/toolkit";
import LocalStorage from "../LocalStorage";

const cartId = LocalStorage.getItem("users")?.other?._id;
const key = cartId;
const initalValue = LocalStorage.getItem(key);

export const CartSlice = createSlice({
    name: "cart",
    initialState: initalValue,
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload);
            LocalStorage.setItem(key, state);
        },
        updateCart: (state, action) => {
            switch (action.payload.type) {
                case "up":
                    state[action.payload.searchIndexCart].quantity += 1;
                    LocalStorage.setItem(key, state);
                    break;
                case "down":
                    state[action.payload.searchIndexCart].quantity -= 1;
                    LocalStorage.setItem(key, state);
                    break;
                case "input":
                    state[action.payload.searchIndexCart].quantity =
                        action.payload.value;
                    LocalStorage.setItem(key, state);
                    break;
                default:
                    throw Error("Hành động không đúng!");
            }
        },
        deleteCart: (state, action) => {
            state.splice(action.payload.count, 1);
            LocalStorage.setItem(key, state);
        },
        isPaid: (state, action) => {
            state.splice(0, action.payload.length);
            LocalStorage.setItem(key, state);
        },
    },
});

export const { addToCart, updateCart, deleteCart, isPaid } = CartSlice.actions;

export default CartSlice.reducer;
