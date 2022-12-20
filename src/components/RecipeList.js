//styles
import './RecipeList.css';
import RecipeItem from './RecipeItem';

export default function RecipeList({ recipes }) {
  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>;
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeItem recipe={recipe} />
      ))}
    </div>
  );
}
