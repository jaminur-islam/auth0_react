import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";

const Details = ({ userr }) => {
  const { user } = useUser();
  console.log(user);
  console.log(userr);
  return (
    <div
      style={{
        border: "2px solid green",
        padding: "20px",
        width: "300px",
        marginLeft: "20px",
        marginTop: "20px",
      }}
    >
      <h2>{userr.id}</h2>
      <p>{userr.name}</p>
      <span>{userr.email}</span>
      <br />
      <span>{userr.phone}</span>
    </div>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();
  const paths = users.map((user) => {
    return {
      params: { id: user.id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const userr = await res.json();
  console.log(userr);

  return {
    props: { userr },
  };
};

export default withPageAuthRequired(Details);
