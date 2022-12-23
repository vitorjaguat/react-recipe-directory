import { useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';

//styles
import './Update.css';

export default function Update() {
  const { recipe } = useLocation();
  console.log(recipe);
  const [title, setTitle] = useState(recipe.title);
  const [method, setMethod] = useState(recipe.method);
  const [cookingTime, setCookingTime] = useState(
    +recipe.cookingTime.replace(/\D/g, '')
  );

  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [image, setImage] = useState(recipe.image);

  const history = useHistory();

  const handleIngredients = (e) => {
    const newIngredients = e.target.value.split(',');
    setIngredients(newIngredients);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const doc = {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + ' minutes',
      image,
    };

    try {
      await projectFirestore
        .collection('recipes')
        .doc(recipe.id)
        .update({
          ...doc,
        });
    } catch (err) {
      console.log(err);
    }
    history.push(`/recipes/${recipe.id}`);
  };

  return (
    <div className="update">
      <h2 className="page-title">Update your recipe</h2>
      <form onSubmit={handleUpdate}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => handleIngredients(e)}
              value={ingredients}
            />
          </div>
        </label>

        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <label>
          <span>Image (url):</span>
          <input
            type="text"
            onChange={(e) => setImage(e.target.value)}
            value={image}
            required
          />
        </label>

        <button className="btn">submit</button>
      </form>
    </div>
  );
}
