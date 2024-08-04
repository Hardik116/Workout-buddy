import React from 'react'
import { useState } from 'react'
import useSignup from '../hooks/useSignup'
import { divide } from 'lodash'

function Signup() {

    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {signup , loading , error} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup (email,password);
        console.log(email, password)
      }
    

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={loading}>Sign up</button>
      
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup