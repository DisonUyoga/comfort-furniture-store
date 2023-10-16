import {createSlice, createAsyncThunk, createEntityAdapter, createSelector} from '@reduxjs/toolkit'
import axios from 'axios'
import {sub} from 'date-fns'
import {redirect} from 'react-router-dom'


const productAdapter= createEntityAdapter({
    sortComparer: (a,b)=>b.date.localeCompare(a.date)
})
const URL = '/api/v1/latest-products'

export const fetchProducts= createAsyncThunk('fetchProducts/products', async()=>{
    try{
        const response= await axios.get(URL)
        return [...response.data]
    }catch(err){
        return err.message
    }
})

const initialState= productAdapter.getInitialState({
    status: 'idle',
    error:null,
    cart:[],
    total:0,
    cartQuantity:0,
    isAuthenticated: false,
    productTotal:0


  
})

const productSlice=createSlice({
    name:'products',
    initialState,
    reducers:{
        addToCart(state, action){
            const {itemId, quantity}=action.payload
            state.cart.push(itemId)
            const product= state.entities[itemId]
            parseInt(quantity)>0?product.quantity+=parseInt(quantity) : product.quantity++
            state.productTotal=parseInt(state.entities[itemId].price)*parseInt(state.entities[itemId].quantity)
            state.total+=(parseInt(state.entities[itemId].price)*parseInt(state.entities[itemId].quantity))
            parseInt(quantity)>=1?state.cartQuantity=parseInt(state.cartQuantity)+parseInt(quantity):state.cartQuantity++
            
            // add items to localStorage
            if(product){
                
                if(localStorage.getItem("cart")){
                    localStorage.removeItem("cart")
                    localStorage.setItem("cart", JSON.stringify(product))
                    
                }else{
                    localStorage.setItem("cart", JSON.stringify(product))
                    
                }
            }
        },
        removeItemStore(state, action){
            const {itemId, idArray}=action.payload
            const filter =idArray.filter(item=>item!==itemId)
            state.cart=[...filter]
          
        },
        increment(state, action){
            const {itemId}=action.payload
            
            if(parseInt(state.entities[itemId].quantity)>=0){
                state.entities[itemId].quantity++
            }else{
                state.entities[itemId].quantity=0
            }
        },
        decrement(state, action){
            const {itemId}=action.payload
           
            if(parseInt(state.entities[itemId].quantity)>=0){
                state.entities[itemId].quantity--
            }else{
                state.entities[itemId].quantity=0
            }
        },
        cartTotal(state,action){
            const {itemIds}= action.payload
            
           let total =itemIds.length>0?itemIds.reduce((acc,curr)=>acc+=parseInt(state.entities[parseInt(curr)].total),0):0
            let quantity = itemIds.length>0? itemIds.reduce((acc,curr)=>acc+=parseInt(state.entities[curr].quantity),0):0
            state.total=total
            state.cartQuantity=quantity
        },
        itemTotal(state, action){
            const { quantity, price, id}= action.payload
            state.entities[id].total=price*quantity
        },
       
        auth(state,action){
            
           const token = localStorage.getItem("token")
            state.isAuthenticated= token? true:false
                  
           
        },
        logout(state, action){
           localStorage.removeItem("token")
            state.isAuthenticated=false 
            redirect("/login")
        }
       
       
    },
    extraReducers(builder){
        builder
            .addCase(fetchProducts.pending, (state, action)=>{
                state.status='loading'
            })
            .addCase(fetchProducts.fulfilled, (state, action)=>{
                state.status='succeeded'
                
                let min=1
                const loadedProducts = action.payload.map(product=>{
                    product.date= sub(new Date(), {minutes: min++}).toISOString()
                    product.quantity=0
                    product.total=0
                    product.cartTotal=0
                    product.cartQuantity=0
                    
                    return product
                })

                productAdapter.upsertMany(state, loadedProducts)

            })
            .addCase(fetchProducts.rejected, (state, action)=>{
                state.status='failed'
                state.error= action.error.message
            })
    }
})

export const {
    selectAll:selectAllProducts,
    selectById: selectProductById,
    selectIds:selectProductIds
}= productAdapter.getSelectors(state=>state.products)

export const getProductStatus=state=>state.products.status
export const getProductError= state=>state.products.error
export const getCartItems=state=>state.products.cart
export const getTotal=state=>state.products.total
export const getCartTotal=state=>state.products.cartQuantity
export const getAuth=state=>state.products.isAuthenticated
export const getProductTotal=state=>state.products.productTotal
export const selectProductByName=createSelector(
    [selectAllProducts,(state, item_type)=>item_type],
    (products, item_type)=>products.filter(product=>product.item_type===item_type)
    )
export const {addToCart, 
    removeItemStore, 
    increment, 
    decrement,
    cartTotal, 
    itemTotal,
    auth, logout
}=productSlice.actions
export default productSlice.reducer