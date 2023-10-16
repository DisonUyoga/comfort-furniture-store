import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'
import Home from './features/home/Home'
import Layout from './pages/Layout'
import ProductDetail from './features/product/ProductDetail'
import Cart from './features/cart/Cart'
import Login, {action as loginAction} from './pages/Login'
import Signup, {action as signupAction} from './pages/Signup'
import Search, {loader as searchLoader} from './pages/Search'

const router =createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout/>}>
    <Route index element={<Home/>}/>
    <Route path=':category_slug/:product_slug' element={<ProductDetail/>}/>
    <Route path="cart" element={<Cart/>}/>
    <Route path='login' action={loginAction} element={<Login/>}/>
    <Route path="signup" action={signupAction} element={<Signup/>}/>
    <Route path="search" element={<Search/>} loader={searchLoader}/>
  </Route>
))
function App() {
 

  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
