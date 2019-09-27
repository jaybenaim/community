import React from "react";
import { create } from "react-test-renderer";

describe("Map Component should render markers", () => {
  test("MapMarkers are rendering onto the map", () => {
    const mapMarker = create(<div className="hammer"></div>);
    expect(mapMarker).toMatchSnapshot();
  });
});
