import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import { useauthcontext } from './hooks/useauthcontext.jsx'
import React from "react"

import Home from "./pages/Home"
import Navbar from './component/Navbar'

import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

function App() {
  const {user} = useauthcontext();
  return (
    <>
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className="Page">
        <Routes>
          <Route path='/'element={user ? <Home /> : <Navigate to="/login" />}  />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
