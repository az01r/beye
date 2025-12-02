import { Form, NavLink, useRouteLoaderData } from "react-router";
import classes from "./Navbar.module.css";

function Navbar() {
  // the token is retrieved from the loader data and not with the util/auth function to re-evaluate
  // its state and eventually update the page
  const token = useRouteLoaderData("root") as string | null;

  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${classes.link} ${classes.active}` : classes.link;

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
          {/* <li>
            <NavLink to="/connections/new" className={linkClassName}>
              
            </NavLink>
          </li> */}
        </ul>
        <div className={classes.navbarRight}>
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
