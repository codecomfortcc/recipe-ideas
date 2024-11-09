import { Button } from "../components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../providers/theme-provider";
import { cn } from "../lib/utils";

const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "relative w-8 h-8 rounded-full hover:scale-110 transition-transform duration-200 ease-[ cubic-bezier(0.68,_-0.55,_0.265,_1.55)] overflow-hidden ",
        className
      )}
    >
      <Sun
        className={cn(
          "h-5 w-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-spring",
          theme === "light"
            ? "rotate-0 opacity-100 scale-100"
            : "rotate-90 opacity-0 scale-0"
        )}
      />

      <Moon
        className={cn(
          "h-5 w-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-spring",
          theme === "dark"
            ? "rotate-0 opacity-100 scale-100"
            : "rotate-90 opacity-0 scale-0"
        )}
      />
    </Button>
  );
};

export default ThemeToggle;
