import {useState} from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

export default function Login(){
    const navigate=useNavigate()
    const [userDetails,setUserDetails]=useState({email:'',password:'', name:''})
    //const [error, setError] = useState('');

    async function handleLogin(e){
        e.preventDefault()
    
        console.log(userDetails)
        try{
           await axios.post('http://localhost:4000/register',userDetails)
           navigate(`/`)
        } catch (error){
            console.log(error)
        }
    }
    return(
        <>
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