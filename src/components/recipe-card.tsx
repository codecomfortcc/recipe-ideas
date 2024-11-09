import { useNavigate } from "react-router-dom";
import { RecipeProps } from "../types";


const RecipeCard = ({ idMeal,strMealThumb,strMeal }:RecipeProps) => {
console.log(idMeal)
  const router =useNavigate()
  const handleOnClick = () => {
    router(`/menu/${idMeal}`)
  }
  return (
    <div onClick={handleOnClick} key={idMeal} className="group relative max-md:w-full  max-md:h-32 flex flex-col max-md:flex-row b rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out bg-card animate-fadeIn border">
      <div className="relative max-md:max-w-44 max-md:h-full  overflow-hidden ">
        <img
          src={strMealThumb}
          alt={strMeal}
          className=" object-cover object transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>


      <div className=" relative  w-full p-4 flex items-center md:items-start justify-center ">
        <h3 className="text-lg md:text-xl font-semibold text-primary  transition-colors duration-300 line-clamp-2 text-center md:text-left z-10">
          {strMeal}
        </h3>
        {/* <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" /> */}
      </div>
    
    </div>
  );
};

export default RecipeCard;


