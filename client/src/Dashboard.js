import React,{useEffect} from "react";
import axios from "axios";




export default function Dashboard(){

    useEffect(()=>{
        console.log('dashboard useEffect')
        async function checkAuth () {
            
           
            const user=await axios.get('http://localhost:4000/checkData',{ withCredentials: true})
            console.log('dashboard',user)
        }
        checkAuth()
    },[])

    

    return(
        <>
            <center>You are authenticated</center>
            <center><a href="http://localhost:4000/logout">Logout</a></center>
        </>
    )
}
