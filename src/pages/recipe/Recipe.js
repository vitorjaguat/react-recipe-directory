import { projectFirestore } from '../../firebase/config';
import { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import AuthContext from '../../context/AuthContext';

//styles
import './Recipe.css';

export default function Recipe() {
  const { id } = useParams();
  const { mode, color } = useTheme();
  const history = useHistory();
  const { token, uid } = useContext(AuthContext);

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore
      .collection('recipes')
      .doc(id)
      .onSnapshot((doc) => {
        // console.log(doc);
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError('Could not find this recipe');
        }
      });

    return () => unsub();
  }, [id]);

  const handleClickUpdateBtn = () => {
    if (token && uid === recipe.uid) {
      history.push({ pathname: `/update/${id}`, recipe: { ...recipe, id } });
    } else {
      alert("You don't have permission to update this recipe!");
    }
  };

  const handleClickDeleteBtn = (id) => {
    if (token && uid === recipe.uid) {
      projectFirestore.collection('recipes').doc(id).delete();
      history.push('/');
    } else {
      alert("You don't have permission to delete this recipe!");
    }
  };

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <img className="image" src={recipe.image} alt={recipe.title} />
          <h2 className="page-title">{recipe.title}</h2>
          <small>Takes {recipe.cookingTime} to cook.</small>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>

          {token && uid === recipe.uid && (
            <button
              onClick={handleClickUpdateBtn}
              style={{ background: color }}
            >
              Update
            </button>
          )}
          {token && uid === recipe.uid && (
            <button
              onClick={() => handleClickDeleteBtn(id)}
              style={{ background: color }}
            >
              Delete
            </button>
          )}
        </>
      )}
    </div>
  );
}
