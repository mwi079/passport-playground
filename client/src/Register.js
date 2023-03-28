import {useState} from "react";
import axios from 'axios'

export default function Login(){

    const [userDetails,setUserDetails]=useState({email:'',password:'', name:''})
    //const [error, setError] = useState('');

    async function handleLogin(e){
        e.preventDefault()
    
        console.log(userDetails)
        try{
            await axios.post('http://localhost:4000/register',userDetails)
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
                    <input type='text' placeholder="name" onChange={(e)=>setUserDetails({...userDetails,name:e.target.value})}></input>
                    <input type="email" placeholder="email" onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}></input>
                    <input type="password" placeholder="password" onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}></input>
                    <button type="submit">Login</button>
                </form>
            </center>
        </>
    )
}