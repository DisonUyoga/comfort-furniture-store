import {NavLink,Link, Outlet} from "react-router-dom"
import { getCartTotal , getAuth, logout} from "../features/home/productSlice"
import {useSelector, useDispatch} from 'react-redux'
import {useState} from 'react'
export default function Layout(){
    const cartQuantity=useSelector(getCartTotal)
    const isAuthenticated=useSelector(getAuth)
    const [searchItem, setSearchItem]=useState()
    const dispatch=useDispatch()
  
    
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container-fluid">
                    <NavLink end className={({isActive})=> isActive? "navbar-brand active": "navbar-brand"}  to="/">Comfort Furniture</NavLink>
                        
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                            <NavLink className={({isActive})=>isActive? "nav-link active" : "nav-link"} aria-current="page" to=".">Home</NavLink>
                            </li>
                         
                           <li className="nav-item me-2 ">
                                <NavLink className="nav-link btn btn-success text-white active" to="cart">
                                    <span>
                                    <i className="bi bi-basket-fill"></i>
                                    Cart {parseInt(cartQuantity)>0?`(${cartQuantity})`:null}
                                    </span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                            {isAuthenticated?null:<NavLink className={({isActive})=>isActive? "btn nav-link btn-dark me-2 active" : "btn-dark me-2 btn"} aria-current="page" to="login">Log in</NavLink>}
                            </li>
                           <li className="nav-item">
                            {isAuthenticated?null:<NavLink className={({isActive})=>isActive? "btn btn-dark me-2 active" : "btn-warning me-2 btn"} aria-current="page" to="signup">Sign up</NavLink>}
                            </li>
                            <li className="nav-item">
                            {!isAuthenticated?null:<NavLink className={({isActive})=>isActive? "btn btn-dark me-2 active" : "btn-danger me-2 btn"} aria-current="page" to="login" onClick={()=>dispatch(logout())}>Log out</NavLink>}
                            </li>

                           
                            
                        </ul>
                        <div className="d-flex">
                            <input className="form-control me-2" value={searchItem} type="search" placeholder="search" onChange={(e)=>setSearchItem(e.target.value)} aria-label="Search"/>
                            {searchItem?<Link to={`search?product=${searchItem}`} className="btn  btn-dark" onClick={()=>setSearchItem('')}>Search</Link>:
                            <button className="btn  btn-dark" aria-disabled>Search</button>}
                        </div>
                        </div>
                    </div>
</nav>
  <Outlet/>
  <footer className="bg-dark text-white pt-8 pb-8    text-center">
      <p>Site developed by D&W webtech solutions &#169; 2023. Service Contact: +254702122421. Licenced by Kenya Revenue Authority. Site Managed by Comfort Furnitures, Contact 0714057939</p>
  </footer>
        </>
    )
}