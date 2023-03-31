import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard'
import Register from './Register'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route element={<Login/>} path="/"/>
          <Route element={<Dashboard/>} path="/dashboard"/>
          <Route element={<Register/>} path="/register"/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
