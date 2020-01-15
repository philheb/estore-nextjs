import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { useRouter } from "next/router";
import { totalItem } from "../actions/cart";
import NProgress from "nprogress";
import {
  IoMdPersonAdd,
  IoMdLogOut,
  IoMdLogIn,
  IoMdCart,
  IoMdPricetags
} from "react-icons/io";
import { MdSettings } from "react-icons/md";

import { APP_NAME } from "../config";
import { signout, isAuth } from "../actions/auth";
import Search from "./Search";
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
  const [auth, setAuth] = useState(false);
  const [count, setCount] = useState(0);

  const toggle = () => setIsOpen(!isOpen);

  const path = useRouter().pathname;

  useEffect(() => {
    setAuth(isAuth() ? true : false);
    setCount(totalItem());
  }, []);

  return (
    <div>
      <Navbar color='light' light expand='md'>
        <Link href='/' passHref>
          <NavLink style={{ cursor: "pointer" }}>{APP_NAME}</NavLink>
        </Link>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto nav-align' navbar>
            <Search />
            <NavItem>
              <Link href='/shop'>
                <NavLink
                  className='mr-4'
                  style={
                    path === "/shop"
                      ? { color: "#212529", cursor: "pointer" }
                      : { cursor: "pointer" }
                  }
                >
                  <IoMdPricetags className='mr-1' />
                  Shop
                </NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href='/cart'>
                <NavLink
                  className='mr-4'
                  style={
                    path === "/cart"
                      ? { color: "#212529", cursor: "pointer" }
                      : { cursor: "pointer" }
                  }
                >
                  <IoMdCart className='mr-1' />
                  {count > 0 ? `Cart (${count})` : `Cart`}
                </NavLink>
              </Link>
            </NavItem>
            {!auth && (
              <>
                <NavItem>
                  <Link href='/auth/signin' passHref>
                    <NavLink
                      className='mr-4 '
                      style={
                        path === "/auth/signin"
                          ? { color: "#212529", cursor: "pointer" }
                          : { cursor: "pointer" }
                      }
                    >
                      <IoMdLogIn className='mr-1' />
                      Log In
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href='/auth/signup' passHref>
                    <NavLink
                      className='mr-4 '
                      style={
                        path === "/auth/signup"
                          ? { color: "#212529", cursor: "pointer" }
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
            {auth && (
              <>
                <NavItem>
                  <Link href='/dashboard' passHref>
                    <NavLink
                      className='mr-4 '
                      style={
                        path === "/dashboard"
                          ? { color: "#212529", cursor: "pointer" }
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
