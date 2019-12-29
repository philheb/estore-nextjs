import Layout from "../components/Layout";
import Private from "../components/auth/Private";

const Dashboard = () => {
  return (
    <Private>
      <Layout>
        <div>
          <h1>Dashboard</h1>
        </div>
      </Layout>
    </Private>
  );
};

export default Dashboard;
