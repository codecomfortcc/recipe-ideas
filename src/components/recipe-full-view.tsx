import {  useNavigate, useParams} from "react-router-dom";
import { FullRecipeProps } from "../types";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";
import { getRecipeById } from "../services/api";
import { cn } from "../lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { Cross } from "lucide-react";

// full recipe view component
const RecipeFullView   = () => {
  const [recipe,setRecipe] = useState<FullRecipeProps | null>(null)
  const [loading,setLoading] = useState(true)
  const {id} =useParams<{id:string}>()
  useEffect(() => {
    const loadRecipe = async () => {
      try{
        if (!id) return;
        const recipe = await getRecipeById(id);
        setRecipe(recipe);
        setLoading(false);
      }
      catch(error){
        console.error("Error loading recipe",error)
      }
    }
    console.log(id)
    loadRecipe()
  },[])
  return (
    <div className="pt-20 gradient-container">
      
      <RecipeFullCard recipe={recipe} loading={loading} />
    </div>
  )
}
interface FullRecipeCardProps {
  recipe: FullRecipeProps | null;
  loading: boolean;
}
// full recipe card component
const RecipeFullCard:React.FC<FullRecipeCardProps> = ({ recipe, loading }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1)
  }
  return (
    <div className=" min-h-screen max-w-6xl mx-auto bg-background rounded-lg border relative p-2">
    <div className="flex w-full justify-end">
    <Button onClick={handleBack} className="w-10  mt-2 mr-2 ">
      <Cross className="w-4 h-4 rotate-[45deg] " />
      </Button>
    </div>
    <div className="flex flex-col lg:flex-row gap-8 p-2 ">
   
    {loading ? (
      <div className="w-full lg:w-1/2">
        <Skeleton className="h-full w-full" />
      </div>
    ) : (
      recipe && recipe.strMealThumb && (
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full lg:w-1/2 rounded-lg object-cover"
        />
      )
    )}

    <div className="w-full lg:w-1/2">
      {loading ? (
        <div className="w-full flex flex-col ">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-56 w-full mb-2" />
          <Skeleton className="h-42 w-full mb-2" />
          <Skeleton className="h-8 w-1/4 mb-2" />
        </div>
      ) : (
        recipe && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-primary uppercase">{recipe.strMeal}</h2>

            {recipe.strCategory && (
              <p className="text-sm text-foreground font-semibold"><span className='text-primary '>Category:</span> {recipe.strCategory}</p>
            )}
            {recipe.strArea && (
              <p className="text-sm text-foreground font-semibold"><span className='text-primary'>Cuisine: </span> {recipe.strArea}</p>
            )}
            {recipe.strInstructions && (
              <p className="mt-4 text-accent-foreground">{recipe.strInstructions}</p>
            )}

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-primary">Ingredients</h3>
              <ul className="grid md:grid-cols-2 grid-cols-1 gap-4 dark:text-gray-400 text-gray-600">
                {recipe.strIngredients.map(
                  (ingredient, index) =>
                    ingredient && (
                      <li key={index} className="flex justify-between">
                        <span className='font-semibold text-foreground'>{ingredient}</span>
                        <span>{recipe.strMeasures[index]}</span>
                      </li>
                    )
                )}
              </ul>
            </div>

            {recipe.strYoutube && (
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants(), "mt-6")}
              >
                Watch on YouTube
              </a>
            )}
          </div>
        )
      )}
    </div>
  </div>
  </div>
  )
}
export default RecipeFullView 
