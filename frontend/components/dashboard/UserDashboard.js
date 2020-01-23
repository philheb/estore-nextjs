import Link from "next/link";
import Private from "../auth/Private";

const Dashboard = props => {
  const userLinks = () => {
    return (
      <section className='card mb-5 shadow-sm'>
        <h3 className='card-header'>User Links</h3>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>
            <Link href='/cart'>
              <a>My Cart</a>
            </Link>
          </li>
          <li className='list-group-item'>
            <Link href={`/user`}>
              <a>Update profile</a>
            </Link>
          </li>
        </ul>
      </section>
    );
  };

  const userInfo = token => {
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

  const userHistory = () => {
    return (
      <section className='card mb-5 shadow-sm'>
        <h3 className='card-header'>Orders History</h3>
      </section>
    );
  };

  return (
    <Private>
      <div className='container'>
        <h1 className='mb-5'>{`${props.user.name}'s Dashboard`}</h1>
        <div className='row'>
          <div className='col-lg-3'>{userLinks()}</div>
          <div className='col-lg-9'>
            {userInfo()}
            {userHistory()}
          </div>
        </div>
      </div>
    </Private>
  );
};

export default Dashboard;
