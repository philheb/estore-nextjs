import { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";

import { APP_NAME } from "../config";
import { signout, isAuth } from "../actions/auth";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from "reactstrap";

// import Search from "./blog/Search";

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color='light' light expand='md'>
        <Link href='/'>
          <NavbarBrand
            style={{ cursor: "pointer" }}
            // className='font-weight-bold'
          >
            {APP_NAME}
          </NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto nav-align' navbar>
            {!isAuth() && (
              <>
                <NavItem>
                  <Link href='/auth/signin'>
                    <NavLink
                      className='mr-4'
                      style={{ cursor: "pointer" }}
                      // className='btn btn-outline-danger text-danger mr-2'
                    >
                      Log In
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href='/auth/signup'>
                    <NavLink className='mr-4' style={{ cursor: "pointer" }}>
                      Sign Up
                    </NavLink>
                  </Link>
                </NavItem>
              </>
            )}
            {isAuth() && (
              <>
                <NavItem>
                  <NavLink
                    onClick={() => signout(() => Router.replace("/"))}
                    className='mr-4'
                    style={{ cursor: "pointer" }}
                  >
                    Sign Out
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
