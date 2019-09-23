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
import MyProfile from "../MyProfile";

class SearchPage extends Component {
  state = {
    profileSearched: {
      idUrl: null,
      profileName: "User",
      email: "Email",
      address: "Address"
    },
    searchItem: null,
    searchResults: [],
    loading: false,
    redirect: false,
    loaded: false,
    showSearchedProfile: false
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
        userProfile.push(res.data);
        this.setState({
          profileSearched: {
            idUrl: `profiles/${userProfile[0].id}/`,
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
  showProfilePageForSearchedUser = () => {
    this.setState({ showSearchedProfile: true });
  };
  componentDidMount = () => {
    this.props.handleNavClassChange();
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
        {this.showSearchedProfile ? (
          <MyProfile userProfile={this.state.profileSearched} />
        ) : (
          <Container fluid={true} className="grid-container">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search for an item"
                className="mr-sm-2"
                ref={this.searchRef}
              />
              <Button variant="primary" onClick={this.handleSearchQuery}>
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
                    <Button
                      variant="primary"
                      onClick={this.showProfilePageForSearchedUser}
                    >
                      {/* <a href={this.state.profileSearched.idUrl}> */}
                      Click to see {this.state.profileSearched.profileName}'s
                      profile
                      {/* </a> */}
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
