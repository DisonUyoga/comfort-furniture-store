import axios from 'axios'

export async function loginUser(creds){
    const res = await fetch("http://localhost:8000/api/v1/token/login",{
        method:"post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(creds)
    
    })
    const data= await res.json()
    if(!res.ok){
        throw{
            message: "Invalid credentials",
            statusText: res.statusText,
            status:res.status
        }
        
    }
    return data
}

export async function signupUsers(creds){
    const res = await fetch("http://localhost:8000/api/v1/users/",{
        method:"post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(creds)
    })

    const data = await res.json()
    if(!res.ok){
        throw{
            message: "Something went wrong please try again",
            statusText: res.statusText,
            status: res.status
        }
    }
    return data
}

export async function searchData(item){
    try{
        const res= await axios.post('/api/v1/products/search/', {query:item})
        return res.data
    }catch(err){
        return err.message
    }
    
}