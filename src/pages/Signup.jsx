import {Form, NavLink, useActionData, redirect, useNavigation} from 'react-router-dom'
import {signupUsers } from './loginApi/getCred'



export async function action({request}){
    const formData = await request.formData()
    const username = formData.get("username")
    const password = formData.get("password")
    try{
   
    console.log(password, username)
    await signupUsers({username,password})
    
    return redirect("/login")

    }catch(err){
        return err.message
    }
    
   
}

export default function Signup(){
    const navigation= useNavigation()
    const error = useActionData()
    return(
        <>
            <div className="container-lg bg-light">
                <div className="container-lg">
                <div className="row bg-light justify-content-center mt-5 mb-4">
                    <div className="col-lg-4 rounded">
                        <h1 className="lead display-5 text-center">Sign up</h1>
                        <Form method="post" replace>

                            <label  className="form-label">Username</label>
                                    <div className="mb-4 input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-person-circle"></i>
                                        </span>
                                        <input type="text" name="username"  className="form-control" id="email" placeholder="e.g maina"/>
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
                                        <input type="password" name="password" className="form-control" id="name" placeholder="......"/>
                                        <span className="input-group-text">
                                            <span data-bs-placement="bottom" title="Enter Password">
                                                <i className="bi bi-question-circle"></i>
                                            </span>
                                            
                                        </span>

                                    </div>

                                    <label className="form-label">Repeat Password</label>
                                    <div className="input-group mb-4">
                                        <span className="input-group-text">
                                            <i className="bi bi-key"></i>
                                        </span>
                                        <input type="password"  className="form-control" id="name" placeholder="......"/>
                                        <span className="input-group-text">
                                            <span  data-bs-placement="bottom" title="Enter Password">
                                                <i className="bi bi-question-circle"></i>
                                            </span>
                                            
                                        </span>

                                    </div>


                                    {error && <p className="text-danger">{error}</p>}
                        
                        
                            
                            <div className="text-center">
                            
                                <button className="btn text-white btn-outline-primary btn-success rounded-pill">{navigation.state==='idle'?"Sign up": "Signing up..."}</button>
                            </div>
                           
                            Or <NavLink to="/login">click here</NavLink> to log in
                        </Form>

                    </div>

                </div>

            </div>
            </div>
        </>
    )
}