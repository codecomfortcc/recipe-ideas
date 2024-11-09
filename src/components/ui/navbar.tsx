import { NavLink } from "react-router-dom";
import ThemeToggle from "../../utils/theme-toggle";

const Navbar = () => {
  return (
    <header className="w-full z-[9999] fixed top-0  h-10 py-2 flex justify-center items-center">
      <nav className=" bg-background border border-foreground rounded-full flex items-center px-2 py-2  mt-7  ">
        <ul className="flex gap-5 mr-3 font-bold justify-around items-center  ">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-primary" : "text-foreground"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                isActive ? "text-primary" : "text-foreground"
              }
            >
              Menu
            </NavLink>
          </li>
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Navbar;
