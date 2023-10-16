import {Form, redirect, useActionData, useNavigation} from 'react-router-dom'
import { loginUser } from './loginApi/getCred'
import { auth } from '../features/home/productSlice'
import {useDispatch} from 'react-redux'

export async function action({request}){
// const url = new URL(request.url).searchParams.get("pathName")
const formData = await request.formData()
const username = formData.get("username")
const password= formData.get("password")
 
try{
        const res = await loginUser({username,password})
        localStorage.setItem("token", res.auth_token)
        const token =localStorage.getItem("token")
        return redirect(token?'/':'/login')
}catch(error){
    return error.message
}

}

export default function Login(){
    const error = useActionData()
    const navigation = useNavigation()
    const dispatch=useDispatch()
    return(
        <>
            <div className="container-lg my-5">
    <div className="row justify-content-center">
        <div className="col-lg-4 my-5">
            <h1 className="lead display-5 text-center">Log in</h1>
            <Form method="post" replace>
                
                <label  className="form-label">Username</label>
                        <div className="mb-4 input-group">
                            <span className="input-group-text">
                                <i className="bi bi-person-circle"></i>
                            </span>
                            <input type="text" name="username" className="form-control" placeholder="e.g maina"/>
                            <span className="input-group-text">
                                <span className="tt" data-bs-placement="bottom" title="Enter your username">
                                    <i className="bi bi-question-circle text-muted"></i>
                                </span>
                                
                            </span>
                        </div>
                       
                        <label  className="form-label">Password</label>
                        <div className="input-group mb-4">
                            <span className="input-group-text">
                               
                                <i className="bi bi-key"></i>
                            </span>
                            <input type="password" name="password" className="form-control"  placeholder="......"/>
                            <span className="input-group-text">
                                <span className="tt" data-bs-placement="bottom" title="Enter Password">
                                     <i className="bi bi-person-circle"></i>
                                </span>
                                
                            </span>

                        </div>
                
                {error && <p className='text-danger'>{error}</p>}
               
                <div className="text-center">
                  
                   <button className="btn btn-outline-primary text-white rounded-pill btn-success" onClick={()=>dispatch(auth())}>{navigation.state==='idle'?"Log in": "Logging in..."}</button>

                </div>
               
               
            </Form>

        </div>

    </div>

  </div>
        </>
    )
}
