import { useState } from 'react';
import { useworkoutcontext } from '../hooks/useworkoutcontext';
import { useauthcontext } from '../hooks/useauthcontext';

const WorkoutForm = () => {
  const { dispatch } = useworkoutcontext();
  const { user } = useauthcontext();
  const [title, setTitle] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    if (!user) {
      setError("You need to be logged in");
      return;
    }

    const workout = { title, weight, reps };

    try {
      const response = await fetch('http://localhost:3000/api/workouts', {
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}` // Include token if needed
        }
      });

      // Check if the response is OK
      if (!response.ok) {
        const errorData = await response.json(); // Parse JSON error data
        throw new Error(errorData.error || 'An error occurred');
      }

      // Parse JSON response
      const json = await response.json();
      setEmptyFields([]);
      setError(null);
      setTitle('');
      setWeight('');
      setReps('');
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
      console.log('New workout added:', json);

    } catch (error) {
      setError(error.message);
      // Handle empty fields if available in error response
      if (error.message.includes('Validation failed')) {
        setEmptyFields(['title', 'weight', 'reps']); // Example, update based on actual error structure
      }
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Weight (in kg):</label>
      <input 
        type="number" 
        onChange={(e) => setWeight(e.target.value)} 
        value={weight}
        className={emptyFields.includes('weight') ? 'error' : ''}
      />

      <label>Number of Reps:</label>
      <input 
        type="number" 
        onChange={(e) => setReps(e.target.value)} 
        value={reps} 
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button type="submit">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
