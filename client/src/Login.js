import {useState} from "react";
import axios from 'axios'

export default function Login(){

    const [userDetails,setUserDetails]=useState({email:'',password:''})
    //const [error, setError] = useState('');

    function handleLogin(e){
        e.preventDefault()
    
        console.log(userDetails)
        try{
            axios.post('http://localhost:4000/login',userDetails)
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
                    <input type="email" placeholder="email" onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}></input>
                    <input type="password" placeholder="password" onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}></input>
                    <button type="submit">Login</button>
                </form>
            </center>
        </>
    )
}

