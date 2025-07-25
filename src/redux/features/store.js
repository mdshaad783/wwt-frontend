import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query/react"
import { apiSlice } from "../api/apiSlice.js"
import authReducer from "./auth/authSlice.js"
import favoritesReducer from '../features/favorites/favoritesSlice.js'
import {getFavoritesFromLocalStorage} from '../../Utils/localStorage.js'
import cartSliceReducer from '../features/cart/cartSlice.js'
import shopReducer from '../features/shop/shopSlice.js'


const initialFavorites = getFavoritesFromLocalStorage() || []

const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth:authReducer,
        favorites:favoritesReducer,
        cart : cartSliceReducer,
        shop: shopReducer

    },
        preloadedState:{
            favorites:initialFavorites
        },
        middleware:(getDefaultMiddleware)=>
            getDefaultMiddleware().concat(apiSlice.middleware),
        devTools:true,
})
setupListeners(store.dispatch)
export default store;