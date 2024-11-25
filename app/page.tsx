"use client";

import React from "react";
import Login from "./components/Login";
import { useUser } from "./context/userContext";
import Welcome from "./components/Welcome";

const Home: React.FC = () => {
  const user = useUser();

  return (
    <div className="flex-grow">
      {user.user ? <Welcome /> : <Login />}
    </div>
  );
};

export default Home;
