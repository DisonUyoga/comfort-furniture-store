import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { 
  selectProductIds, 
  getProductStatus, 
  getProductError, 
  fetchProducts, 
  selectProductByName,
  auth,
  getAuth 
} from './productSlice';
import Spinner from '../../components/Spinner';
import Product from '../../components/Product';
import {useSearchParams} from 'react-router-dom'


const Home = () => {
  const productIds= useSelector(selectProductIds)
  const status=useSelector(getProductStatus)
  const error = useSelector(getProductError)
  const dispatch= useDispatch()
  const [searchParams, setSearchParams]=useSearchParams()
  const isAuthenticated =useSelector(getAuth)
  const typeFilter = searchParams.get('type')
  const filteredProducts=useSelector(state=>selectProductByName(state, typeFilter))

  dispatch(auth())
  if(isAuthenticated===false){
    dispatch(auth())
  }
  
  useEffect(()=>{
    if(status==='idle'){
      dispatch(fetchProducts())
    }
  },[status, dispatch])

  let content
  if(status==='loading'){
    content=<Spinner/>
  }else if(status==='succeeded'){
    content=filteredProducts.length>0?filteredProducts.map(item=><Product key={item.id} itemId={item.id} typeFilter={typeFilter}/>):productIds.map(itemId=><Product key={itemId} itemId={itemId} typeFilter={typeFilter}/>)
  }else if(status==='failed'){
    content=error
  }

  function handleType(key, value){
    setSearchParams(prev=>{
      if(value===null){
        prev.delete(key)
      }else{
        prev.set(key, value)
      }
      return prev
    })
  }


  return (
    <>
      <div className="home">

<section className="bg-primary">
<div className="justify-content-center text-center container-md py-6 px-6 mb-5">
<h1 className="text-white lead fw-bold display-5">
    Welcome to Comfort Furnitures

</h1>
<p className="text-white  text-center lead display-md-7">
    The Best and Reliable online Funiture Store in Nyahururu

</p>
<small className="text-white lead text-center fst-italic">Contact: 0714 057939, E-mail: juliusmainagithuna@gmail.com</small>
<hr/>
<div className="text-center mb-4 p-4">
    <p className="text-center lead text-light fst-italic">We offer free doorstep deliveries!</p>
    <p className="text-center lead text-light fst-italic">Choose your items and add them into the Cart</p>
</div>
    



</div>

</section>
<section className="container-md my-5">
<div className="mb-5">
    <div className="row my-5 g-6 bg-light justify-content-center text-center">
            <div className=" col-lg-12 text-center my-5">
                <h1 className="fw-bold lead">Latest Products</h1>
                    <ul className="nav nav-tabs justify-content-center">
                    <li className="nav-item">
                        <button className={typeFilter==="sofa"?"btn btn-dark btn-sm active":"btn btn-warning btn-sm"} onClick={()=>handleType("type", "sofa")}>Sofa</button>
                    </li>
                    <li className="nav-item">
                        <button className={typeFilter==="bed"?"btn btn-dark btn-sm active" :"btn btn-success btn-sm"} onClick={()=>handleType("type", "bed")}>Beds</button>
                    </li>
                    <li className="nav-item">
                        <button className={typeFilter==="wardrop"?"btn btn-dark btn-sm active":"btn btn-info btn-sm"} onClick={()=>handleType("type", "wardrobe")}>Wardrobe</button>
                    </li>
                    <li className="nav-item">
                        <button className={typeFilter==="table"?"btn btn-dark btn-sm active":"btn btn-primary btn-sm"} onClick={()=>handleType("type", "table")}>Table</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-danger btn-sm" onClick={()=>handleType("type", null)}>clear</button>
                    </li>
                   
                    </ul>
            
        </div>
    
       
        {content}
        
    </div>
    
    

</div>

</section>
</div>
    </>
  );
}

export default Home;
