import { useRouter } from "next/router";
import React, { useState } from "react";

const Login = () => {
  const route = useRouter();
  const [num, setNum] = useState(1);

  return (
    <div>
      <h1>{num}</h1>
      <button onClick={() => setNum(num++)}>increase</button>
      <button onClick={() => setNum(num--)}>Decrease</button>
      <button>Click </button>
    </div>
  );
};

export default Login;
