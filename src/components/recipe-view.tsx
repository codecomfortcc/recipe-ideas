import RecipeCard from "./recipe-card";
import { RecipeProps } from "../types";

const RecipeView = ({recipes}:{recipes:RecipeProps[] | undefined}) => {
  // recipe card container
  return <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {recipes?.map((recipe) => (
        console.log(recipe.idMeal),
        <RecipeCard
          idMeal={recipe.idMeal}
          strMealThumb={recipe.strMealThumb}
          strMeal={recipe.strMeal}
        />
      ))}
    </div>
  </>;
};

export default RecipeView;
