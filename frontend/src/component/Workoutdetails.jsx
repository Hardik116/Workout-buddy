import React from 'react';
import { useworkoutcontext } from '../hooks/useworkoutcontext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useauthcontext } from '../hooks/useauthcontext';

function Workoutdetail({ workout }) {
  const { user } = useauthcontext();
  const { dispatch } = useworkoutcontext();

  const handleClick = async () => {
    if (!user) {
      console.log("You need to be logged in to delete a workout.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/workouts/' + workout._id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}` // Add Authorization header
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete workout');
      }

      const json = await response.json();
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span onClick={handleClick}>delete</span>
    </div>
  );
}

export default Workoutdetail;
