import React from "react";
import { create } from "react-test-renderer";

describe("ProfileItem Component", () => {
  test("ProfileItem component has a label for the name", () => {
    const itemName = create(<label htmlFor="item name">Item Name</label>);
    expect(itemName.toJSON()).toMatchSnapshot();
  });
});
describe("ProfileItem Component", () => {
  test("ProfileItem component has a label for the price", () => {
    const itemPrice = create(<label htmlFor="item price">Item Price</label>);
    expect(itemPrice.toJSON()).toMatchSnapshot();
  });
});
describe("ProfileItem Component", () => {
  test("ProfileItem component has a label for the Address", () => {
    const itemAddress = create(
      <label htmlFor="item Address">Item Address</label>
    );
    expect(itemAddress.toJSON()).toMatchSnapshot();
  });
});
