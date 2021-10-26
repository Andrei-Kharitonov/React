import React from "react";
import TestRenderer from "react-test-renderer";
import Title from "../components/Title";

test("Title renderer", () => {
  let testRenderer = TestRenderer.create(<Title />);
  let testInstance = testRenderer.root;

  expect(testInstance.findByProps({ className: "title" }).children).toEqual(["React App is working!"]);
});