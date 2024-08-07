import { useState } from "react"
import uselogin from "../hooks/uselogin"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const{login,error,loading} = uselogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email,password)

    console.log(email, password)
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
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

      <button disabled={loading}>Log in</button>
      {error && <div className="error">{error}</div>}

    </form>
  )
}

export default Login