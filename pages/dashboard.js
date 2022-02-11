import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const dashboard = ({ user, users }) => {
  return (
    <div>
      <p>lorem imsum</p>
      <h1>{users.length}</h1>
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();
  return {
    props: {
      users,
    },
  };
};

export default withPageAuthRequired(dashboard);

// =========
/* import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const dashboard = (props) => {
  console.log(props);
  return <div>sagor miya tmie ki khaiso</div>;
};
// export default dashboard;

export default withPageAuthRequired(dashboard);
*/
