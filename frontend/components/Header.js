import { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import { IoMdPersonAdd, IoMdLogOut, IoMdLogIn } from "react-icons/io";
import { MdSettings } from "react-icons/md";

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

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const path = useRouter().pathname;

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
                      className='mr-4 link'
                      style={
                        path === "/auth/signin"
                          ? { color: "black", cursor: "pointer" }
                          : { cursor: "pointer" }
                      }
                      // className='btn btn-outline-danger text-danger mr-2'
                    >
                      <IoMdLogIn className='mr-1' />
                      Log In
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href='/auth/signup'>
                    <NavLink
                      className='mr-4 link'
                      style={
                        path === "/auth/signup"
                          ? { color: "black", cursor: "pointer" }
                          : { cursor: "pointer" }
                      }
                    >
                      <IoMdPersonAdd className='mr-1' />
                      Sign Up
                    </NavLink>
                  </Link>
                </NavItem>
              </>
            )}
            {isAuth() && (
              <>
                <NavItem>
                  <Link href='/dashboard'>
                    <NavLink
                      className='mr-4 link'
                      style={
                        path === "/auth/signup"
                          ? { color: "black", cursor: "pointer" }
                          : { cursor: "pointer" }
                      }
                    >
                      <MdSettings className='mr-1' />
                      Dashboard
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <NavLink
                    onClick={() => signout(() => Router.replace("/"))}
                    className='mr-4'
                    style={{ cursor: "pointer" }}
                  >
                    <IoMdLogOut className='mr-1' />
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
