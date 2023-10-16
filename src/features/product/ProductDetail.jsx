import {useSelector, useDispatch} from 'react-redux'
import { useLocation, NavLink } from 'react-router-dom';
import { 
  selectProductById,
  getProductStatus, 
  fetchProducts, 
  getProductError,
  getCartItems,
  cartTotal,
  addToCart,
  removeItemStore,
  getProductTotal,
  getCartTotal
  
    } from '../home/productSlice';
import { useEffect, useState} from 'react';
import Spinner from '../../components/Spinner';
import ProductBox from '../../components/ProductBox';
const ProductDetail = () => {
    const dispatch=useDispatch()
    const status=useSelector(getProductStatus)
    const error =useSelector(getProductError)
    const itemIds= useSelector(getCartItems)
    const cartQuantity=useSelector(getCartTotal)
    const [qty, setQty]=useState(0)
   
    const invoice=useSelector(getProductTotal)
    const [productIds, setProductIds]=useState([...new Set(itemIds)])
   const {itemId}=useLocation().state
   
   const product=useSelector((state=>selectProductById(state, itemId)))

   useEffect(()=>{
    dispatch(cartTotal({itemIds:productIds}))
    }, [productIds, dispatch])
   useEffect(()=>{
    if(status==='idle'){
        dispatch(fetchProducts())
    }
   }, [status, dispatch])

   function handleInput(item){
    dispatch(addToCart({itemId:product.id, quantity:item }))
    setQty('')
   }

   let content
   if(status==='loading'){
    content=<Spinner/>
   }else if(status==='succeeded'){
    content=<ProductBox product={product}/>
   }else if(status==='failed'){
    content=<p>{error}</p>
   }
   
   function removeItem(id){
    itemIds.length>0?(setProductIds(prev=>{
        const newIds=prev.filter(itemId=>itemId!==id)
        return [...newIds]
    })):[]
}
   
  return (
    <div>
      <div className="container-lg mt-5 mb-4">
        <div className="row g-8 mt-8 mb-5 justify-content-center">
        <div className='mt-2 mb-4  rounded bg-dark justify-content-between align-items-center d-flex'>
          <div>
            <div className="text-center mb-2">
                  <button className="btn ms-4 btn-success btn-sm mt-3 rounded-pill" onClick={()=>handleInput(qty)}>Add to cart</button>
              </div>
              <div onClick={()=>removeItem(product.id)}>
                  <button className="btn ms-4 btn-sm btn-danger rounded-pill" onClick={()=>dispatch(removeItemStore({itemId:product.id, idArray:productIds}))}>remove item</button>
              </div>
              </div>
              <div className="mb-2 me-4">
              
                        <div className="input-group mt-4 mb-4">
                            <span className="input-group-text">
                                <i className="bi bi-basket-fill"></i>
                            </span>
                            <input type="number"  min="1" value={qty} onChange={(e)=>setQty(e.target.value)} className="form-control"/>
                            <span className="input-group-text">
                                <span  data-bs-placement="bottom">
                                    <i className="bi bi-question-circle"></i>
                                </span>
                                
                            </span>

                        </div>
                        <div className="text-center mt-2 ">
                            {product?.quantity && <button className="btn btn-center btn-warning bt-sm rounded mt-4">Quantity: {product.quantity}</button>}<br/>
                            {product?.quantity && <button className="btn btn-center btn-danger bt-sm rounded mt-4">Item Total KSH. {invoice}</button>}<br/>
                            {product?.quantity && <NavLink to="/" className="btn btn-center btn-info btn-sm rounded me-2 mt-4" >add more items...</NavLink>} 
                            {cartQuantity&& <NavLink to="/cart" className="btn btn-center btn-primary btn-sm rounded me-2 mt-4" >go to Cart: {`(${cartQuantity})`}</NavLink>} 

                        </div> 
                        </div>
          </div>

          <hr/>
            
            {content}
        </div>
    </div>
    </div>
  );
}

export default ProductDetail;
