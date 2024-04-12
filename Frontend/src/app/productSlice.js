import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    data:[],
}
const productSlice=createSlice({
    name:"products",
    initialState,
    reducers:{
        fetchProducts(state,action){
            state.data=action.payload
        }
    }
});
export const {fetchProducts}=productSlice.actions;//functions
export default productSlice.reducer;//state

export function getProducts(){
    return async function getProductThunk(dispatch,getState){
        const res =await axios.get('https://fakestoreapi.com/products/')
        const result=(res.data)
        dispatch(fetchProducts(result))
    }
}