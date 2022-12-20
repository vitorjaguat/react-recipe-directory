import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeList from '../../components/RecipeList';
import './Search.css';
import { projectFirestore as db } from '../../firebase/config';
import loader from '../../assets/loading.svg';
import { useTheme } from '../../hooks/useTheme';

export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get('q');

  const { mode } = useTheme();

  const [recipes, setRecipes] = useState(null);
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);
    setRecipes(null);
    const collectionRef = db.collection('recipes');
    collectionRef.get().then((docs) => {
      let docArray = [];
      docs.forEach((doc) => {
        if (doc.data().title.toLowerCase().includes(query.toLowerCase())) {
          docArray.push({ id: doc.id, ...doc.data() });
        }
      });
      setIsPending(false);
      setRecipes(docArray);
    });
  }, [query]);

  return (
    <div>
      <h1 className={`page-title ${mode}`}>Search results for "{query}"</h1>
      {error && <p className={`error ${mode}`}>{error}</p>}
      {isPending && (
        <div className="loader-image">
          <img
            src={loader}
            alt="Loading"
            style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
          />
        </div>
      )}
      {recipes && (
        <div className="search-results">
          <RecipeList recipes={recipes} />
        </div>
      )}
    </div>
  );
}
