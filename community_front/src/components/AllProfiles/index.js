import React, { Component } from "react";
import ProfileCard from "../ProfileCard";
class AllProfiles extends Component {
  render() {
    const { allProfiles, allItems } = this.props;
    const profileElements = allProfiles.map((p, i) => (
      <ProfileCard key={p.id} {...p} allItems={allItems} />
    ));
    return <div>{profileElements}</div>;
  }
}

export default AllProfiles;
