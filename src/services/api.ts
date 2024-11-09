import { FullRecipeProps, RecipeProps,FetchDataProps } from "../types";
// get all recipes by category
export async function getRecipeByCategory(category:string):Promise<RecipeProps[]>{
  const URL=`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  const data = await fetchData({url:URL})
  return data.meals
}

// get all recipes by area
export async function getRecipeByArea(area:string):Promise<RecipeProps[]>{
  const URL=`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  const data = await fetchData({url:URL})
  return data.meals
}
// get full recipe data by id
export async function getRecipeById(id:string):Promise<FullRecipeProps | null> {
  const URL=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  const data = await fetchData({url:URL})
  const meal = data.meals[0];
  const { ingredients, measures } = extractIngredientsAndMeasures(meal);
  return {
    idMeal: meal.idMeal,
    strMeal: meal.strMeal || null,
    strDrinkAlternate: meal.strDrinkAlternate || null,
    strCategory: meal.strCategory || null,
    strArea: meal.strArea || null,
    strInstructions: meal.strInstructions || null,
    strMealThumb: meal.strMealThumb || null,
    strTags: meal.strTags || null,
    strYoutube: meal.strYoutube || null,
    strSource: meal.strSource || null,
    strImageSource: meal.strImageSource || null,
    strCreativeCommonsConfirmed: meal.strCreativeCommonsConfirmed || null,
    dateModified: meal.dateModified || null,
    strIngredients: ingredients,
    strMeasures: measures
  };
}
function extractIngredientsAndMeasures(meal:any){
  const ingredients: string[] = [];
  const measures: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && typeof ingredient === "string" && ingredient.trim() !== "") {
      ingredients.push(ingredient.trim());
    }
    if (measure && typeof measure === "string" && measure.trim() !== "") {
      measures.push(measure.trim());
    }
  }

  return { ingredients, measures };
}

// get searched recipes
export async function getFilteredMealsByIngredients(ingredients: string): Promise<RecipeProps[]> {
  try {
    // Split and clean up ingredients, separating inclusions and exclusions
    const splitIngredients = ingredients.split(",").map(i => i.trim().toLowerCase());
    
    const inclusionList = splitIngredients
      .filter(i => !i.startsWith("no "))
      .map(i => i.trim());
      
    const exclusionList = splitIngredients
      .filter(i => i.startsWith("no "))
      .map(i => i.replace("no ", "").trim());

    if (inclusionList.length === 0) {
      throw new Error("At least one ingredient for inclusion is required");
    }

    // Maps to store meals and their match counts
    const mealsMap = new Map<string, RecipeProps>();
    const mealCount = new Map<string, number>();
    
    // Fetch all meals for inclusion ingredients
    for (const ingredient of inclusionList) {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
      const result = await fetchData({ url });
      
      if (result && result.meals) {
        result.meals.forEach((meal: RecipeProps) => {
          if (!mealsMap.has(meal.idMeal)) {
            mealsMap.set(meal.idMeal, meal);
          }
          mealCount.set(meal.idMeal, (mealCount.get(meal.idMeal) || 0) + 1);
        });
      }
    }

    // Get meals that match all inclusion ingredients
    let filteredMeals = Array.from(mealsMap.values()).filter(
      meal => mealCount.get(meal.idMeal) === inclusionList.length
    );

    // Handle exclusions if present
    if (exclusionList.length > 0) {
      const excludedMealsMap = new Map<string, Set<string>>();

      // Fetch meals for each excluded ingredient
      for (const excludeIngredient of exclusionList) {
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${excludeIngredient}`;
        const result = await fetchData({ url });
        
        if (result && result.meals) {
          // Explicitly type the meals array and create a properly typed Set
          const excludedMealIds = new Set<string>(
            (result.meals as RecipeProps[]).map(meal => meal.idMeal)
          );
          excludedMealsMap.set(excludeIngredient, excludedMealIds);
        }
      }

      // Remove meals that contain any excluded ingredient
      filteredMeals = filteredMeals.filter(meal => {
        for (const [_, excludedMealIds] of excludedMealsMap) {
          if (excludedMealIds.has(meal.idMeal)) {
            return false;
          }
        }
        return true;
      });
    }

    return filteredMeals;
    
  } catch (error) {
    console.error('Error in getFilteredMealsByIngredients:', error);
    throw error;
  }
}
// get random recipes by count
export async function getRandomRecipes(count:number):Promise<RecipeProps[]>{
const URL='https://www.themealdb.com/api/json/v1/1/random.php' 
const uniqueData = new Map()
// Fetch data until we have the required number of unique meals
while (uniqueData.size < count){
  const remaining = count - uniqueData.size;
  const fetchPromises = Array.from({ length: remaining }, () => fetchData({url:URL}));
  const results = await Promise.all(fetchPromises);

  results.forEach((result) => {
    if(result && result.meals){
      if(!uniqueData.has(result.meals[0].idMeal)){
        uniqueData.set(result.meals[0].idMeal,{idMeal:result.meals[0].idMeal,strMealThumb:result.meals[0].strMealThumb,strMeal:result.meals[0].strMeal})
    }
  }
  });

}


return new Promise((resolve) => {
  setTimeout(() => {
    resolve(Array.from(uniqueData.values()));
  }, 1000);
});
}

async function fetchData({url,options}:FetchDataProps){
  try{
    const response =await fetch(url,options)
    const data = await response.json()
    return data
  }
  catch(error){
    console.error(error)
    return null
  }

}
