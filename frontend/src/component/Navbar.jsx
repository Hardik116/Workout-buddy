// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import uselogout from '../hooks/uselogout'; // Correct default import
import { useauthcontext } from '../hooks/useauthcontext';

const Navbar = () => {
  const { logout } = uselogout(); // Call the hook to get the logout function
  const { user } = useauthcontext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
