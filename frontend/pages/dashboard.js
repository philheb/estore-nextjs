import { useState, useEffect } from "react";
import UserDashboard from "../components/dashboard/UserDashboard";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import Layout from "../components/Layout";
import { isAuth } from "../actions/auth";

const Dashboard = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    role: "",
    isLoading: true
  });

  const { role, isLoading } = values;

  useEffect(() => {
    const user = isAuth();
    setValues({
      ...values,
      name: user.name,
      email: user.email,
      role: user.role === 1 ? "Administrator" : "Registered User",
      isLoading: false
    });
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className='container'>
          <div className='row justify-content-center'>
            <div
              class='spinner-border'
              style={{ width: "3rem", height: "3rem" }}
              role='status'
            >
              <span class='sr-only'>Loading...</span>
            </div>
          </div>
        </div>
      </Layout>
    );
  } else {
    if (role === "Administrator") {
      return (
        <Layout>
          <AdminDashboard user={values} />
        </Layout>
      );
    } else {
      return (
        <Layout>
          <UserDashboard user={values} />
        </Layout>
      );
    }
  }
};

export default Dashboard;
