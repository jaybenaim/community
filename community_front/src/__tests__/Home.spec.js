import React from "react";
import { create } from "react-test-renderer";
describe("Home Component", () => {
  test("Shows at least one image li", () => {
    const li = create(<li></li>);
    expect(li.toJSON()).toMatchSnapshot();
  });
});
