import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Root from "../../../apis/root";
import Container from "react-bootstrap/Container";
import "./index.css";
import Card from "react-bootstrap/Card";
import ProfilePage from "./ProfilePage";

class SearchPage extends Component {
  state = {
    // profileSearched: {
    //   id: null,
    //   idUrl: "",
    //   profileName: "User",
    //   email: "Email",
    //   address: "Address"
    // },
    profileSearched: [], 
    searchItem: null,
    searchResults: [],
    loading: false,
    redirect: false,
    loaded: false,
    showSearchedProfile: false, 
    clickedProfile: [], 
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
              this.getSearchProfile(item.profile_id);
              return this.state.profileSearched
            }
          })
        });
      })
      .then(res => {
        setTimeout(() => {
          
        }, 1000);
      });
  };

  getSearchProfile = (profileId) => {
    try {
      // const profileId = this.state.searchResults[0].profile_id;
      const userProfile = [];
      Root.get(`profiles/${profileId}/`).then(res => {
        userProfile.push(res.data);
        this.setState({
          profileSearched: [...this.state.profileSearched, {
            id: userProfile[0].id,
            idUrl: `profiles/${userProfile[0].id}/`,
            profileName: userProfile[0].profile_name,
            email: userProfile[0].email,
            address: userProfile[0].address
          }]
        });
      });
    } catch (error) {
      alert("No Item Found");
    }
  };
  showProfilePageForSearchedUser = (profile) => {
    let user = profile 
    console.log(user)  
    this.setState({ showSearchedProfile: true, clickedProfile: [...this.state.clickedProfile, profile] });
  };
  componentDidMount = () => {
    this.props.handleNavClassChange();
  };
  
  render() {
    console.log(localStorage['token'])
    const { showSearchedProfile, profileSearched, searchResults } = this.state; 

    let searchedProfileCards = profileSearched.map((profile, i) =>  { 
     
      return (
            <Row md={10} lg={10} className="searched-cards-container">
          <Card key={i} className="searched-cards" style={{ width: "12rem" }}>
            <Card.Img
              variant="top"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            />
            <Card.Body>
              <Card.Title>{profile.profileName}</Card.Title>
              <Button
                variant="primary"
                onClick={() => this.showProfilePageForSearchedUser(profile)}
              >
                Click to see {profile.profileName}'s profile
              </Button>
            </Card.Body>
          </Card>
          </Row>
      
      )}
    )
    return (
      <>
        {this.state.clickedProfile[0] ? (
          <ProfilePage
            userProfile={this.state.clickedProfile[0]}
            handleItem={this.props.handleItem}
            handleNavClassChange={this.props.handleNavClassChange}
            chatShow={this.props.chatShow}
            handleChatToggle={this.props.handleChatToggle}
            userWhoBorrowed={profileSearched.profileName}
          />
        ) : (
          <Container
            sm={12}
            md={12}
            lg={12}
            fluid={true}
            className="grid-container"
          >
            <Row>
              <Col sm={12} md={12} lg={12}>
                <Form inline className="search-bar-container">
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
            <Row className="show-grid">{searchedProfileCards}</Row>
              </Col>
            </Row>
          </Container>
        )}
      </>
    );
  }
} 

export default SearchPage;
