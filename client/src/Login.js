import {useState} from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

export default function Login(){
    const navigate=useNavigate()
    const [loginDetails,setLoginDetails]=useState({username:'',password:''})
    //const [error, setError] = useState('');

    async function handleLogin(e){
        e.preventDefault()
        try{
            const {data}=await axios.post('http://localhost:4000/login',loginDetails)
            console.log(data)
            console.log(await axios.post('http://localhost:4000/checkAuth'))
            if(data) navigate(`/dashboard/${data.name}`)
            else throw Error('No user')
        } catch (error){
            console.log(error)
        }
    }
    return(
        <>
            <center>You are unauthenticated</center>
            <center><a href="http://localhost:4000/auth/google"> Google Login</a></center>
            <center>
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="email" onChange={(e)=>setLoginDetails({...loginDetails,username:e.target.value})}></input>
                    <input type="password" placeholder="password" onChange={(e)=>setLoginDetails({...loginDetails,password:e.target.value})}></input>
                    <button type="submit">Login</button>
                </form>
              
            </center>
        </>
    )
}

