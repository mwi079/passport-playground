import {useState} from "react";
import axios from 'axios'

export default function Login(){

    const [loginDetails,setLoginDetails]=useState({email:'',password:''})
    //const [error, setError] = useState('');

    async function handleLogin(e){
        e.preventDefault()
        try{
            await axios.post('http://localhost:4000/login',loginDetails)
            const data=await axios.get('http://localhost:4000/checkData')
            console.log(data)
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
                    <input type="email" placeholder="email" onChange={(e)=>setLoginDetails({...loginDetails,email:e.target.value})}></input>
                    <input type="password" placeholder="password" onChange={(e)=>setLoginDetails({...loginDetails,password:e.target.value})}></input>
                    <button type="submit">Login</button>
                </form>
            </center>
        </>
    )
}

