import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./cartSlice";
import productSlice from "./productSlice";
import {useSelector} from "react-redux"
import { walletSlice } from "./wallet.service";

export const store= configureStore({
    reducer:{
        modal:modalSlice,
        // product:productSlice,
        [walletSlice.name]:walletSlice.reducer
    },
})
export const useAppSelector=useSelector;