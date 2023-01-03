import { useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useTheme } from '../hooks/useTheme';
import AuthContext from '../context/AuthContext';
import logout from '../assets/logout.svg';

//styles
import './Navbar.css';

export default function Navbar() {
  const { color, mode } = useTheme();
  const authCtx = useContext(AuthContext);

  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="brand">
          <h1>Appetite</h1>
        </Link>
        <SearchBar />
        {authCtx.isLoggedIn && (
          <Link className="link" to="/create">
            Create Recipe
          </Link>
        )}
        {!authCtx.isLoggedIn && (
          <Link className="link" to="/login">
            Signup/Login
          </Link>
        )}

        {authCtx.isLoggedIn && (
          <div className="logout">
            <img
              src={logout}
              alt="Logout"
              onClick={authCtx.logout}
              style={{
                filter: 'invert(100%',
              }}
            />
          </div>
        )}
      </nav>
    </div>
  );
}
