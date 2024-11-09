export interface RecipeProps {
  strMealThumb: string;
  idMeal: string;
  strMeal: string;
}
export interface FetchDataProps{
  url:string;
  options?:{
    method:"GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD" | "CONNECT" | "TRACE";
    headers:{
      [key:string]:string;
    }
    body?: string;
  };
}
export interface FullRecipeProps {
  idMeal: string;
  strMeal: string;
  strMealThumb: string ;
  strInstructions: string ;
  strCategory: string | null;
  strDrinkAlternate: string | null;
  strArea: string | null;
  strTags: string | null;
  strYoutube: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
  strIngredients: string[]; 
  strMeasures: string[];    
}
