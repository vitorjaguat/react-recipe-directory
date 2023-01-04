import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import Trashcan from '../assets/trashcan.svg';
import { projectFirestore } from '../firebase/config';
import './RecipeItem.css';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

export default function RecipeItem({ recipe }) {
  const { mode } = useTheme();
  const { uid, token } = useContext(AuthContext);

  const handleClick = (id) => {
    projectFirestore.collection('recipes').doc(id).delete();
  };

  return (
    <div key={recipe.id} className="recipe-item">
      <div className={`card ${mode}`}>
        <div className="info">
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 400)}...</div>
          <div className="links">
            <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
            {token && recipe.uid === uid && (
              <img
                className="delete"
                src={Trashcan}
                alt="delete"
                onClick={() => handleClick(recipe.id)}
              />
            )}
          </div>
        </div>
        <div className="img">
          <img src={recipe.image} alt={recipe.title} />
        </div>
      </div>
    </div>
  );
}
