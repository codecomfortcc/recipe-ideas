
import { HomeIcon, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import pageNotFound from '../assets/page-not-found.svg';
const PageNotFound = () => {
  const navigate = useNavigate();
  const handleGoHomePage = () => {  
    navigate("/");
  }
  const handleGoBackPage = () => {
    navigate(-1);
  }

  return (
    <div className="min-h-screen w-full pt-10 flex items-center justify-center bg-background">
      <div className="container px-4 md:px-6 flex flex-col items-center justify-center space-y-8 text-center">
        {/* SVG Animation */}
        <div className="relative w-64 h-64">
        <img src={pageNotFound} alt="404" />
        </div>

        {/* Error Text */}
        <div className="space-y-4">
          <h1 className="text-7xl font-bold tracking-tighter text-primary">404</h1>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Page Not Found
          </h2>
          <p className="max-w-[600px] text-muted-foreground">
            Oops! The page you're looking for seems to have wandered off into the digital wilderness. 
            Don't worry, even the best explorers get lost sometimes.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors" onClick={handleGoHomePage}>
            <HomeIcon className="w-4 h-4 mr-2" />
            Go Home
          </button>
          <button className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors" onClick={handleGoBackPage}>
            <ArrowLeft className="w-4 h-4 mr-2"  />
            Go Back
          </button>
        </div>

        {/* Additional Details */}
        <div className="text-sm text-muted-foreground border-t border-border pt-8 mt-8">
          <p>If you believe this is a mistake, please contact support</p>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
