import {defer, useLoaderData, Await, useSearchParams} from 'react-router-dom'
import { Suspense } from 'react'
import Spinner from '../components/Spinner'
import ProductBox from '../components/ProductBox'
import { searchData } from './loginApi/getCred'

export async function loader({request}){
    const query=new URL(request.url).searchParams.get("product")
    console.log('query',query)
    const res = searchData(query)
    return defer({query:res})
}

const Search = () => {
    const loaderData=useLoaderData()
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams]= useSearchParams()
    const query = searchParams.get("product")

   
  return (
    <div>
    <div className=" container-lg mb-5 mt-5">
    <div className="row justify-content-center">
    <div className="col-lg-12">
        <h1 className="lead text-center">Search</h1>
        <h2 className="lead">Search term: { query }</h2>

    </div>
        <Suspense fallback={<Spinner/>}>
            <Await resolve={loaderData.query}>
                {/* {handleSearch} */}
                {product=>product.map(product=><ProductBox  key={product.id} query={query} product={product}/>)}
            </Await>
        </Suspense>
    
                  

  </div>
</div>
    </div>
  );
}

export default Search;
