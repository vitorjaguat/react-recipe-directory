import { projectFirestore } from '../../firebase/config';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

//styles
import './Recipe.css';

export default function Recipe() {
  const { id } = useParams();
  const { mode, color } = useTheme();
  const history = useHistory();

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
    history.push({ pathname: `/update/${id}`, recipe: { ...recipe, id } });
  };

  const handleClickDeleteBtn = (id) => {
    projectFirestore.collection('recipes').doc(id).delete();
    history.push('/');
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

          <button onClick={handleClickUpdateBtn} style={{ background: color }}>
            Update
          </button>
          <button
            onClick={() => handleClickDeleteBtn(id)}
            style={{ background: color }}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}
