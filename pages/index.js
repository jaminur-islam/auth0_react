import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useState, useEffect } from "react";

import { addToDb, clearTheCart, getStoredCart } from "../component/fakedb";
import Login from "../component/Login";

export default function Home({ users }) {
  const { user } = useUser();
  const [orderCollection, setOrderCollection] = useState({});

  useEffect(() => {
    const allOrder = getStoredCart();
    setOrderCollection(allOrder);
  }, []);
  console.log(orderCollection);

  const handleAddToCart = (name) => {
    addToDb(name);
    const allOrderCollection = getStoredCart();
    setOrderCollection(allOrderCollection);
  };

  const myorder = [];
  for (const ord in orderCollection) {
    myorder.push(ord);
  }

  return (
    <div>
      <Link href="/api/auth/login">
        <a>Log IN </a>
      </Link>
      <br />
      <br />
      <h2>{`Shop = ${myorder?.length}`}</h2>
      <br />
      <button onClick={() => clearTheCart()}> remove to cart </button>
      <br />
      <Link href="/api/auth/logout">
        <a>Log Out</a>
      </Link>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <div style={{ marginTop: "50px" }}>
        {users.map((user) => {
          return (
            <div
              key={user.id}
              style={{
                border: "2px solid green",
                width: "50%",
                marginTop: "10px",
                padding: "10px",
              }}
            >
              <h1> {user.name}</h1>
              <Link href={`/${user.id}`}>
                <a
                  style={{
                    background: "green",
                    padding: "5px",
                    borderRadius: " 5px",
                  }}
                >
                  Details
                </a>
              </Link>
              <button onClick={() => handleAddToCart(user.name)}>
                Add to cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();
  return {
    props: {
      users,
    },
  };
};

/* const data =
typeof window !== "undefined" ? getStoredCart("shopping_cart") : null; */
