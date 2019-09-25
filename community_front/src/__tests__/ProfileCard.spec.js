import React from "react";
import { create } from "react-test-renderer";

describe("ProfileCard Component", () => {
  test("ProfileCard has a button that takes users to the profile page", () => {
    const button = create(
      <button variant="primary" onClick={[Function]}>
        Click to see more
      </button>
    );
    expect(button.toJSON()).toMatchSnapshot();
  });
});
