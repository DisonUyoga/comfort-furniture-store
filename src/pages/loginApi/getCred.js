import axios from 'axios'

export async function loginUser(creds){
    try{
        const res = await axios.post("/api/v1/token/login",creds)
        return res.data
    }catch(err){
        return err.message
    }
    
   
}

export async function signupUsers(creds){
    try{
    const res = await axios.post("/api/v1/users/",creds)
    return res.data
    }catch(err){
     return err.message
     }

}

export async function searchData(item){
    try{
        const res= await axios.post('/api/v1/products/search/', {query:item})
        return res.data
    }catch(err){
        return err.message
    }
    
}