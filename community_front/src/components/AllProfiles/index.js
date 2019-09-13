import React, { Component } from "react";
import ProfileCard from "../ProfileCard";
class AllProfiles extends Component {
  render() {
    const { allProfiles } = this.props;
    const profileElements = allProfiles.map((p, i) => (
      <ProfileCard key={p.id} {...p} />
    ));
    return <div>{profileElements}</div>;
  }
}

export default AllProfiles;
