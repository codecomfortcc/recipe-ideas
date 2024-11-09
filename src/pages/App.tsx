import RecipeView from "../components/recipe-view"
import { useState, useEffect, SyntheticEvent } from 'react';
import { Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { getRandomRecipes } from "../services/api";
import { RecipeProps } from "../types";
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [recipes, setRecipes] = useState<RecipeProps[]>();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRandomRecipes = async () => {
      try {
        const randomRecipes = await getRandomRecipes(4);
        setRecipes(randomRecipes);
      } catch (error) {
        console.error('Error loading random recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRandomRecipes();
  }, []);

  const handleSearch = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;
    
    // Redirect to menu page with search query
    navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <div className="gradient-container">
      {/* Hero Section */}
      <div className="relative h-[100dvh] flex flex-col items-center justify-center">
        <div className="relative text-center space-y-6 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Recipe <span className="text-primary">Ideas</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover delicious recipes using ingredients you have at home
          </p>

          <div className="w-full max-w-2xl mx-auto p-2 bg-background/95 backdrop-blur sticky top-0">
            <form onSubmit={handleSearch} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Enter ingredients (comma separated)"
                className="flex-1 text-foreground rounded-full px-4 py-2 dark:bg-white/20 border border-black outline-1 dark:border-none outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 rounded-full px-3 py-2 min-w-10">
                <Search className="w-6 h-6" />
                <span className="max-md:hidden inline">Search</span>
              </Button>
            </form>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Recipe Grid Section */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <RecipeView recipes={recipes} />
      )}
    </div>
  );
};

export default App;
