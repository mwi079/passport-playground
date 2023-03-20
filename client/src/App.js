import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route element={<Login/>} path="/"/>
          <Route element={<Dashboard/>} path="/dashboard/:id"/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
