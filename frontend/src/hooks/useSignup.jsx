import { useauthcontext } from "./useauthcontext";
import { useState } from "react";
import React from 'react'

function useSignup() {
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useauthcontext();

  const signup = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/users/signup', {
        method: 'POST',
        headers: { // Corrected from 'header' to 'headers'
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const json = await response.json(); // Await the JSON parsing

      if (!response.ok) {
        setError(json.error);
      } else {
        localStorage.setItem('user', JSON.stringify(json));
        dispatch({ type: 'LOGIN', payload: json });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
}

export default useSignup;
