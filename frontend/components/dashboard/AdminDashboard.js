import Admin from "../auth/Admin";
import Link from "next/link";

const Dashboard = props => {
  const userInfo = () => {
    return (
      <section className='card mb-5 shadow-sm'>
        <h3 className='card-header'>User Information</h3>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>{props.user.name}</li>
          <li className='list-group-item'>{props.user.email}</li>
          <li className='list-group-item'>{props.user.role}</li>
        </ul>
      </section>
    );
  };

  const adminLinks = () => {
    return (
      <section className='card mb-5 shadow-sm'>
        <h3 className='card-header'>Admin Links</h3>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>
            <Link href='/orders'>
              <a>Orders</a>
            </Link>
          </li>
          <li className='list-group-item'>
            <Link href='/category/create'>
              <a>Create Category</a>
            </Link>
          </li>
          <li className='list-group-item'>
            <Link href='/product/create'>
              <a>Create Product</a>
            </Link>
          </li>
          <li className='list-group-item'>
            <Link href='/product/manage'>
              <a>Manage Products</a>
            </Link>
          </li>
        </ul>
      </section>
    );
  };

  return (
    <Admin>
      <div className='container'>
        <h1 className='mb-5'>{`${props.user.name}'s Dashboard`}</h1>
        <div className='row'>
          <div className='col-lg-3'>{adminLinks()}</div>
          <div className='col-lg-9'>{userInfo()}</div>
        </div>
      </div>
    </Admin>
  );
};

export default Dashboard;
