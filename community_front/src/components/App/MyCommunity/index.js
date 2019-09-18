import React, { Component } from "react";
import ProfileCard from "./ProfileCard";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Root from "../../../apis/root";
import Container from "react-bootstrap/Container";
import "./index.css";

class SearchPage extends Component {
  render() {
    const { allProfiles, allItems } = this.props;

    const profileElements = allProfiles.map((p, i) => (
      <ProfileCard key={p.id} {...p} allItems={allItems} />
    ));
    return (
      <>
        <Container className="grid-container">
          {/* Move search query here  */}
          <div>{profileElements}</div>
        </Container>
      </>
    );
  }
}

export default SearchPage;
