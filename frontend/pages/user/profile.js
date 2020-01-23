import { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import Private from "../../../components/auth/Private";
import { getUser } from "../../../actions/user";
import { getCookie } from "../../../actions/auth";

const User = () => {
  const token = getCookie("token");
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState({});

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = () => {
    setIsLoading(true);
    getUser(token).then(data => {
      if (data.error) {
        console.log(error);
        setIsLoading(false);
      } else {
        console.log(data);
        setUserProfile(data);
        setIsLoading(false);
      }
    });
  };

  return (
    <Private>
      <Layout>
        <h1>TODO: Update user profile</h1>
        <h2>User: {userProfile.name}</h2>
      </Layout>
    </Private>
  );
};

export default User;
