import React from "react";
import { create } from "react-test-renderer";

describe("Map Component Renders", () => {
  test("Map component should render", () => {
    const map = create(
      <section style={{ height: "100vh", width: "100%" }}></section>
    );
    expect(map.toJSON()).toMatchSnapshot();
  });
});
