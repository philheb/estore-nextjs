import { useEffect } from "react";
import Router from "next/router";
import { isAuth } from "../../actions/auth";

const Admin = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push("/auth/signin");
    } else if (isAuth().role !== 1) {
      Router.push("/");
    }
  }, []);

  return <div>{children}</div>;
};

export default Admin;
