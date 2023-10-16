import {Link} from 'react-router-dom'
import { 
    selectProductById, 
    removeItemStore, 
    decrement, 
    increment, 
    itemTotal,
    cartTotal} from '../features/home/productSlice'
import {useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'

export default function CartItem({itemId, removeItem, ids}){
   
    const dispatch=useDispatch()
   const product= useSelector(state=>selectProductById(state, parseInt(itemId)))

   useEffect(()=>{
    dispatch(itemTotal({quantity:product.quantity, price:product.price, id:product.id}))
   }, [product, dispatch])
   console.log('testing',product)

    return (
        <>
            <tr>
                <th scope="row"><Link to={`${product.get_absolute_url}`} state={{itemId:product.id}}>{product.name }</Link></th>
                    <td>{product.price}</td>
                    <td>
                       {parseInt(product.quantity)>=0 ?product.quantity:null}
                         <div className='d-flex' onClick={()=>dispatch(cartTotal({itemIds:ids}))}>
                            <button className="m-2" onClick={()=>dispatch(increment({itemId:product.id}))}>+</button>
                            <button className="m-2" onClick={()=>dispatch(decrement({itemId:product.id,}))}>-</button>
                         </div>
                    </td>
                    <td>Ksh.{product.total>=0?(product.total).toFixed(2):0 }</td>
                    <td onClick={()=>removeItem(product.id)}><button className="btn btn-sm btn-danger rounded-pill" onClick={()=>dispatch(removeItemStore({itemId:product.id, idArray:ids}))}>delete</button></td>
            </tr>
        </>
    )
}