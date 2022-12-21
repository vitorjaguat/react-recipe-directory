import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import Trashcan from '../assets/trashcan.svg';
import { projectFirestore } from '../firebase/config';
import './RecipeItem.css';

export default function RecipeItem({ recipe }) {
  const { mode } = useTheme();

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
            <img
              className="delete"
              src={Trashcan}
              alt="delete"
              onClick={() => handleClick(recipe.id)}
            />
          </div>
        </div>
        <div className="img">
          <img src={recipe.image} alt={recipe.title} />
        </div>
      </div>
    </div>
  );
}
