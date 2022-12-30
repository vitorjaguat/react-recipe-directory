import { useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useTheme } from '../hooks/useTheme';
import AuthContext from '../context/AuthContext';

//styles
import './Navbar.css';

export default function Navbar() {
  const { color } = useTheme();
  const authCtx = useContext(AuthContext);

  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="brand">
          <h1>Appetite</h1>
        </Link>
        <SearchBar />
        {authCtx.isLoggedIn && <Link to="/create">Create Recipe</Link>}
        {!authCtx.isLoggedIn && <Link to="/login">Signup/Login</Link>}
      </nav>
    </div>
  );
}
