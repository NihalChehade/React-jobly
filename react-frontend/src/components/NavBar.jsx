import React, { useContext } from "react";
import "./NavBar.css";
import UserContext from "../UserContext";
import { NavLink } from "react-router-dom";
import { NavbarBrand, Navbar, Nav, NavItem, Button } from "reactstrap";

const NavBar = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Jobly</NavbarBrand>
        <Nav className="ms-auto" navbar>
          {currentUser ? (
            <>
              <NavItem>
                <NavLink to="/companies">Companies</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/jobs">Jobs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/profile">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/logout">Logout {currentUser.username}</NavLink>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink to="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/signup">Sign Up</NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
