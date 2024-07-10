import { configureStore } from "@reduxjs/toolkit";
import { CounterReducer } from "./CounterSlice";
import { BrandReducer } from "./BrandSlice";


export let store = configureStore({
    reducer : {
        counter : CounterReducer,
        brand : BrandReducer,
    }
});