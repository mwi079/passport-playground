import axios from 'axios'
import {useState} from 'react'


function App() {

  const [isAuthenticated, setIsAuthenticated]=useState(false)
  const handleLogin=async()=>{
    await axios('http://localhost:4000/google').catch((e)=>console.log(e)).then((data)=>console.log(data))
  }

  return (
    <div className="App">
      <center>{isAuthenticated?'Authenticated':'Not Authenticated'}</center>
      <center><button onClick={handleLogin}>Login</button></center>
    </div>
  );
}

export default App;
