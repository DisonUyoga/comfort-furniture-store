
import {Link, useNavigate} from 'react-router-dom'
import Furniture from '../images/Furniture.jfif'
import {useSelector, useDispatch} from 'react-redux'
import { selectProductById, getAuth, auth} from '../features/home/productSlice'

// eslint-disable-next-line react/prop-types
export default function Product({itemId, typeFilter}){
    
    const product=useSelector((state=>selectProductById(state, parseInt(itemId))))
   const navigate=useNavigate()
   const dispatch=useDispatch()
    const isAuthenticated= useSelector(getAuth)

    
   
    
    return(
        <>
        <div className="col-md-4 col-lg-3  text-center border-0">
        <div className="card">
        <img src={product?.get_thumbnail ?? Furniture} className="card-img-top img-fluid" alt="Furniture"/>
                    <div className="card-body">
                            <h5 className="card-title">{product?.name}</h5>
                            {product.price && <p className="card-text">Ksh.{product?.price }</p>}
                            
                                {isAuthenticated?
                                    <Link to={`${product?.get_absolute_url}`} className="btn btn-dark rounded-pill"  state={{itemId:product.id, name:typeFilter}}>view Details</Link>:
                                    <Link to="/login"  className='btn btn-sm btn-danger rounded-pill'>view details</Link>
                                }
                    
                    </div>
        </div>
        </div> 
        </>
    )
}


