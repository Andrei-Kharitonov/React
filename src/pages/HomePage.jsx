import React from "react";
import { Link } from "react-router-dom";
import Counter from "../components/Counter";

function HomePage() {
  return (
    <>
      <Counter />
      <Link className="link" to="/about">About page</Link>
    </>
  );
}

export default HomePage;