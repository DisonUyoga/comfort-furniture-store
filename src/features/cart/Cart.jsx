import { useSelector, useDispatch } from "react-redux";
import { getCartItems, cartTotal, getCartTotal, getTotal} from "../home/productSlice";
import {NavLink, Link} from 'react-router-dom'
import CartItem from "../../components/CartItem";
import {useState, useEffect} from 'react'

const Cart = () => {
    const itemIds= useSelector(getCartItems)
    const dispatch=useDispatch()
    const cartQuantity=useSelector(getCartTotal)
    const total= useSelector(getTotal)
    const [productIds, setProductIds] =useState([...new Set(itemIds)])
   console.log(itemIds)
    useEffect(()=>{
        dispatch(cartTotal({itemIds:productIds}))
        
    },[productIds, dispatch])
    
    function removeItem(id){
        itemIds.length>0?(setProductIds(prev=>{
            const newIds=prev.filter(itemId=>itemId!==id)
            return [...newIds]
        })):[]
    }
  
    let cartItems =productIds.map(id=><CartItem key={id} removeItem={removeItem}  ids={productIds} itemId={id}/>)
    console.log(dispatch(cartTotal({itemIds:productIds})))
        
   if(productIds.length<=0){
        return <p className="mt-5 container-sm">Oops! There is nothing in your cart...<Link to="/" className="btn btn-sm btn-outline-primary rounded-pill">add items....</Link></p>
   }
  return (
    <div>
        <div className="container-md">
    
    <div className="row gap-8 justify-content-center">
        <div className="col-sm-12">
            <h1 className="text-center lead display-lg-3">Cart</h1>

        </div>
        <div className="col-sm-12">
            
                <table className="table table-dark table-hover table-striped-columns table-responsive-md">
                    <thead>
                        <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>

                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                      
                        {cartItems&&cartItems}
                    </tbody>
            </table>
            
            
        
          

        </div>
        <div className="col-lg-12">
            <h2 className="lead"> Summary</h2>
            {parseInt(total)>0?<strong>Ksh.{total}</strong>:null}, 
            {parseInt(cartQuantity)>0? `(${cartQuantity}) items`: null} 
            <hr/>
           

           
            <button className="btn btn-sm mb-2 rounded-pill btn-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            make payment
            </button>
        </div>
        
       

    </div>

  </div>
  
  
{/* offcanvas */}
                      
            <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">Profile</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <div>
                <h3 className="lead">Payment</h3>
                <p>
                    Payment can be made directly via mpesa on 0714057939, Please ensure you call first before any transaction.
                    We offer doorstep delivery upon transaction completion and also incredible discounts!!!
                </p>
                <h3 className="lead">About</h3>
                <p>We deal with beds, tables, sofa and wardrobes. Our core principles are client centered.
                    Comfort Furniture main principle is customer satisfaction through integrity and transparency.
                </p>
                <h5 className="text-decoration-underline">Integrity</h5>
                <p>
                    We achieve our integrity by upholding the contracted time schedule, i.e by ensuring we work within the time agreed upon.
                    additionally, we maintain an open communication channel that is responsive and available.
                </p>
                <h5 className="text-decoration-underline">Transparency</h5>
                <p>
                    We ensure our materials meet the clients requirements by inviting the client for inspection during production.
                    Also, clients have the liberty to express their grievances without offense. 
                </p>
                <h3 className="lead">Location</h3>
                <p>While the company is undergoing expansion, we are currently located at Mairo-Inya opposite main stage</p>

                </div>
                {/* <div className="dropdown mt-3">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                    Dropdown button
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
                </div> */}
            </div>
            </div>
{/* offcanvas */}
</div>
    
  );
}

export default Cart;
