import React from 'react';
import { useworkoutcontext } from '../hooks/useworkoutcontext';
import { useState, useEffect } from 'react';
import Workoutdetail from '../component/Workoutdetails';
import Workoutform from '../component/Workoutform';
import { useauthcontext } from '../hooks/useauthcontext';

function Home() {
  const { workouts, dispatch } = useworkoutcontext();
  const {user} = useauthcontext();
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/workouts',{
          headers:{
            'Authorization': `Bearer ${user.token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const json = await response.json();
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    if(user){
      fetchWorkouts();
    }
  }, [dispatch,user]);

  return (
    <div className='home'>
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <Workoutdetail key={workout._id} workout={workout} />
        ))}
      </div>
      <Workoutform />
    </div>
  );
}

export default Home;
