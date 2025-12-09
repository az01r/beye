import { Form, NavLink, useRouteLoaderData } from "react-router";
import { ThemeContext } from "../context/ThemeContext";
import classes from "./Navbar.module.css";
import { useContext } from "react";

function Navbar() {
  // the token is retrieved from the loader data and not with the util/auth function to re-evaluate
  // its state and eventually update the page
  const token = useRouteLoaderData("root") as string | null;
  const { theme, toggleTheme } = useContext(ThemeContext)!;

  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${classes.active}` : undefined;

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul className={classes.list}>
          <li>
            <NavLink to="/" className={linkClassName} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/connections" className={linkClassName} end>
              Connections
            </NavLink>
          </li>
          <li>
            <NavLink to="/queries" className={linkClassName} end>
              Queries
            </NavLink>
          </li>
          <li>
            <NavLink to="/schedules" className={linkClassName} end>
              Schedules
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports" className={linkClassName} end>
              Reports
            </NavLink>
          </li>
        </ul>
        <div className={classes.navbarRight}>
          <button
            className={classes.themeToggle}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            type="button"
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            )}
          </button>
          {token ? (
            <Form action="/logout" method="post">
              <button>Logout</button>
            </Form>
          ) : (
            <NavLink to="/auth?mode=login" className={linkClassName}>
              Login / Register
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
