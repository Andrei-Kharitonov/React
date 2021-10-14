import React from "react";
import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <>
      <h1>About page</h1>
      <Link className="link" to="/">Home page</Link>
    </>
  );
}

export default AboutPage;