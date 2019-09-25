import React from "react";
import { create } from "react-test-renderer";

// CHECKS IF COMPONENTS ALL GET RENDERED

describe("Nav Component", () => {
  test("App has a MyProfile component ", () => {
    const navbar = create(<nav class="nav navbaru"> </nav>);
    expect(navbar.toJSON()).toMatchSnapshot();
  });
});

describe("MyProfile Component", () => {
  test("App has a MyProfile component ", () => {
    const myProfile = create(<div class="cont container"></div>);
    expect(myProfile.toJSON()).toMatchSnapshot();
  });
});

describe("MyProfile Component", () => {
  test("App has a SearchPage component ", () => {
    const searchPage = create(<div class="container container-fluid"></div>);
    expect(searchPage.toJSON()).toMatchSnapshot();
  });
});

describe("MyProfile Component", () => {
  test("App has a Map component ", () => {
    const map = create(<section style="height: 100vh; width: 100%;"></section>);
    expect(map.toJSON()).toMatchSnapshot();
  });
});
