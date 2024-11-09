import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import RecipeCard from "../components/recipe-card";
import { RecipeProps } from "../types";
import {
  getFilteredMealsByIngredients,
  getRandomRecipes,
  getRecipeByArea,
  getRecipeByCategory,
} from "../services/api";
import { areas, categories, moodToCategoriesAndAreas } from "../constants";
import { useSearchParams } from "react-router-dom";

const MenuPage = () => {
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);

  // Function to fetch recipes based on categories and areas
  const fetchRecipesByMoodFilters = async (
    categories: string[],
    areas: string[]
  ) => {
    try {
      const categoryPromises = categories.map((category) =>
        getRecipeByCategory(category.toLowerCase())
      );
      const areaPromises = areas.map((area) =>
        getRecipeByArea(area.toLowerCase())
      );

      const results = await Promise.all([...categoryPromises, ...areaPromises]);

      // Flatten the results and remove duplicates based on idMeal
      const uniqueRecipes = results
        .flat()
        .reduce((acc: RecipeProps[], current) => {
          if (!acc.find((item) => item.idMeal === current.idMeal)) {
            acc.push(current);
          }
          return acc;
        }, []);

      return uniqueRecipes;
    } catch (error) {
      console.error("Error fetching mood-based recipes:", error);
      return [];
    }
  };

  // Handle initial search params and load recipes
  useEffect(() => {
    const initialSearchQuery = searchParams.get("search");
    const moodParam = searchParams.get("moods");

    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        if (moodParam) {
          const moods = moodParam.split(",");
          setSelectedMoods(moods);

          const allCategories = moods.flatMap(
            (mood) =>
              moodToCategoriesAndAreas[
                mood as keyof typeof moodToCategoriesAndAreas
              ]?.categories || []
          );
          const allAreas = moods.flatMap(
            (mood) =>
              moodToCategoriesAndAreas[
                mood as keyof typeof moodToCategoriesAndAreas
              ]?.areas || []
          );

          const moodBasedRecipes = await fetchRecipesByMoodFilters(
            allCategories,
            allAreas
          );
          setRecipes(moodBasedRecipes);
        } else if (initialSearchQuery) {
          setSearchQuery(initialSearchQuery);
          const searchResults = await getFilteredMealsByIngredients(
            initialSearchQuery
          );
          setRecipes(searchResults);
        } else {
          const randomRecipes = await getRandomRecipes(8);
          setRecipes(randomRecipes);
        }
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [searchParams]);
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery) {
        setIsLoading(true);
        try {
          // Replace with your actual search function
          const searchResults = await getFilteredMealsByIngredients(
            searchQuery
          );
          setRecipes(searchResults);
        } catch (error) {
          console.error("Error searching recipes:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleCategoryChange = async (category: string) => {
    setSearchQuery("");
    setSelectedArea("");
    setSelectedCategory(category);
    setIsLoading(true);
    try {
      const categoryResults = await getRecipeByCategory(category);
      setRecipes(categoryResults);
      // Clear search params when filtering by category
      setSearchParams({});
    } catch (error) {
      console.error("Error filtering by category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle area change
  const handleAreaChange = async (area: string) => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedArea(area);
    setIsLoading(true);
    try {
      const areaResults = await getRecipeByArea(area);
      setRecipes(areaResults);
      // Clear search params when filtering by area
      setSearchParams({});
    } catch (error) {
      console.error("Error filtering by area:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // Handle mood selection
  const handleMoodSelection = async (mood: string) => {
    setIsLoading(true);
    let newMoods: string[];

    if (selectedMoods.includes(mood)) {
      newMoods = selectedMoods.filter((m) => m !== mood);
    } else {
      newMoods = [...selectedMoods, mood];
    }

    setSelectedMoods(newMoods);

    try {
      if (newMoods.length > 0) {
        const allCategories = newMoods.flatMap(
          (m) =>
            moodToCategoriesAndAreas[m as keyof typeof moodToCategoriesAndAreas]
              ?.categories || []
        );
        const allAreas = newMoods.flatMap(
          (m) =>
            moodToCategoriesAndAreas[m as keyof typeof moodToCategoriesAndAreas]
              ?.areas || []
        );

        const moodBasedRecipes = await fetchRecipesByMoodFilters(
          allCategories,
          allAreas
        );
        setRecipes(moodBasedRecipes);
        setSearchParams({ moods: newMoods.join(",") });
      } else {
        const randomRecipes = await getRandomRecipes(8);
        setRecipes(randomRecipes);
        setSearchParams({});
      }
    } catch (error) {
      console.error("Error handling mood selection:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear all filters including moods
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedArea("");
    setSelectedMoods([]);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background gradient-container">
      <div className="pt-10 mt-12 sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 mt-5">
          <div className="py-4 space-y-4">
            {/* Search and filters grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="relative md:col-span-7">
                <Input
                  placeholder="Search recipes..."
                  className="w-full pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"  />
              </div>

              <div className="md:col-span-5 flex gap-2 ">
                <Select
                  value={selectedCategory}
                  onValueChange={(category) => handleCategoryChange(category)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* select by mood */}
                <Select onValueChange={handleMoodSelection}>
                  <SelectTrigger>
                 <SelectValue placeholder="Mood" />
                  </SelectTrigger>
                  <SelectContent >
                    {Object.keys(moodToCategoriesAndAreas).map((mood) => (
                      <SelectItem
                        key={mood}
                        value={mood}
                        onClick={() => handleMoodSelection(mood)}
                        
                      >
                        {mood}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={selectedArea}
                  onValueChange={(area) => handleAreaChange(area)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Area" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map((area) => (
                      <SelectItem key={area} value={area.toLowerCase()}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active filters */}
            <div className="flex flex-wrap gap-2">
              {(searchQuery ||
                selectedCategory ||
                selectedArea ||
                selectedMoods.length > 0) && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                  onClick={handleClearFilters}
                >
                  Clear all filters
                </Button>
              )}
  
               
            
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {recipes?.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                idMeal={recipe.idMeal}
                strMealThumb={recipe.strMealThumb}
                strMeal={recipe.strMeal}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MenuPage;
