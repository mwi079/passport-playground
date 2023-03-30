import React,{useEffect} from "react";
import axios from "axios";




export default function Dashboard(){

    useEffect(()=>{
        checkAuth()
    },[])

    async function checkAuth () {
        const auth=await axios.get('http://localhost:4000/checkAuth',{ withCredentials: true })
        console.log(auth)
    }

    return(
        <>
            <center>You are authenticated</center>
            <center><a href="http://localhost:4000/logout">Logout</a></center>
        </>
    )
}
