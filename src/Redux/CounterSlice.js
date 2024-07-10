import { createSlice } from "@reduxjs/toolkit";

let initialState = {counter:0 , userName:""}

let CounterSlice = createSlice({
     name: "CounterSlice",
     initialState, 
     reducers:{
        increase:(state)=>{
            state.counter +=1;
        console.log('increase');
        },
        decrease:(state)=>{          
           state.counter -=1;
         console.log('decrease');
        },

     }
});

export let CounterReducer = CounterSlice.reducer;
export let {increase , decrease} = CounterSlice.actions;
