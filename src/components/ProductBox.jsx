import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { addToCart} from '../features/home/productSlice'

const ProductBox = ({product, query}) => {
   
      
  
  return (
    <>
      <div className=" col-lg-9">
                    <div className="card border-primary border-0">
                    {query&&<Link to={`${product.get_absolute_url}`} className="btn btn-sm btn-success" state={{itemId:product.id}}>add to cart...</Link>}
                        <div className="card-header text-center text-primary">{ product?.name }
                        
                        <img src={product?.get_image ?? <p>Loading image...</p>} className="img-fluid card-img-top"/>
                        <div className="card-body text-center py-5">
                            <h4 className="card-title">Product feature</h4>
                            <p className="card-subtitle lead">
                                Latest Arrivals
                            </p>
                            <p className="display-4 fw-bold my-4 text-primary">
                                Ksh. { product?.price }
                            </p>
                            <p className="card-text mx-5 text-muted d-none d-lg-block">
                                { product?.description }
                            </p>
                            
                            
                        </div>
                        </div>
                       
                    </div>
                </div>
    
            
                

           
            <div className="col-lg-3 py-6 px-6 justify-content-start">
                <h2 className="lead text-center">Information</h2>
                <p><strong>Price:</strong>Ksh. { product?.price }</p>
                <p><strong>Description:</strong>{ product?.description }</p>
                
               

            </div>
    </>
  );
}

export default ProductBox;
