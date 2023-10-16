import {configureStore} from '@reduxjs/toolkit'
import productReducer from '../features/home/productSlice'

export const store= configureStore({
    reducer:{
            products:productReducer
    }
})