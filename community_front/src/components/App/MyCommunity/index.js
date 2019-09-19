import React, { Component } from "react";
import ProfileCard from "./ProfileCard";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Root from "../../../apis/root";
import Container from "react-bootstrap/Container";
import { Redirect, Route, BrowserRouter } from "react-router-dom";
import "./index.css";
import Card from "react-bootstrap/Card";

class SearchPage extends Component {
  state = {
    profileSearched: {
      profileName: "User",
      email: "Email",
      address: "Address"
    },
    searchItem: null,
    searchResults: [],
    loading: false,
    redirect: false,
    loaded: false
  };
  searchRef = React.createRef();

  handleSearchQuery = () => {
    let query = this.searchRef.current.value;

    Root.get("items/")
      .then(res => {
        let items = res.data || [];

        this.setState({
          searchResults: items.filter((item, i) => {
            if (item.name_of_item.toLowerCase() === query.toLowerCase()) {
              return item.profile_id;
            }
          })
        });
      })
      .then(res => {
        setTimeout(() => {
          this.getSearchProfile();
        }, 1000);
      });
  };

  getSearchProfile = () => {
    // const userId = window.localStorage["id"];
    // const { profileId } = this.state;
    //searchresults profile id

    try {
      const profileId = this.state.searchResults[0].profile_id;
      const userProfile = [];
      Root.get(`profiles/${profileId}/`).then(res => {
        console.log(res.data);
        userProfile.push(res.data);
        console.log(userProfile[0].profile_name);
        this.setState({
          profileSearched: {
            profileName: userProfile[0].profile_name,
            email: userProfile[0].email,
            address: userProfile[0].address
          }
        });
      });
    } catch (error) {
      alert("No Item Found");
    }
  };

  render() {
    ///todooo render card with correct profile from search

    // const { allProfiles, allItems } = this.props;
    // const { profileName, email, address } = this.state.profileSearched;
    // const profileElements = allProfiles.map((p, i) => (
    //   <ProfileCard key={p.id} {...p} allItems={allItems} />
    // ));
    return (
      <>
        {!this.state.profileSearched ? (
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              ref={this.searchRef}
            />
            <Button variant="outline-primary" onClick={this.handleSearchQuery}>
              Search
            </Button>
          </Form>
        ) : (
          <Container className="grid-container">
            <Form inline>
              <Form.Label>Search for an item&nbsp;</Form.Label>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                ref={this.searchRef}
              />
              <Button
                variant="outline-primary"
                onClick={this.handleSearchQuery}
              >
                Search
              </Button>
            </Form>
            <Row className="show-grid">
              <Col xs={12} md={4} lg={3}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  />
                  <Card.Body>
                    <Card.Title>
                      {this.state.profileSearched.profileName}
                    </Card.Title>
                    <Card.Text>
                      {this.state.profileSearched.email}
                      <br />
                      {this.state.profileSearched.address}
                    </Card.Text>
                    <Button variant="primary" onClick={this.allItems}>
                      Click to see {this.state.profileSearched.profileName}'s
                      profile
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
      </>
    );
  }
}

export default SearchPage;
