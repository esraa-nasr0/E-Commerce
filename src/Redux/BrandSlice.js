import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export let getBrand = createAsyncThunk('Brandslice/getBrand', 
async()=>{
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    return  data.data ;
});

let initialState = {brand:[] , loading:false , isError:null};

let Brandslice = createSlice({
    name:"Brandslice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getBrand.fulfilled, (state, action) => {
                state.brand = action.payload;
                state.loading = false;
            })
            .addCase(getBrand.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBrand.rejected, (state, action) => {
                state.isError = action.payload;
                state.loading = false;
            });
    }
    // // extraReducers:{
    // //     [getBrand.pending]:(state , action)=>{
    // //         state.loading = true;
    // //     },

    // //     [getBrand.fulfilled]:(state , action)=>{
    // //         state.brand = action.payload;
    // //         state.loading = false;
    // //     },
        
    // //     [getBrand.fulfilled]:(state , action)=>{
    // //         // state.isError = action.payload;
    // //         state.loading = false;
    // //     },
    // }
});
export let BrandReducer = Brandslice.reducer;