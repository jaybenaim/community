import React from "react";
import "./index.css";
import Button from "react-bootstrap/Button";
import Root from "../../../apis/root";

class ItemGrid extends React.Component {
  resetItemAvailability = e => {
    e.preventDefault();
    const { id, userProfile, name, price } = this.props;

    Root.patch(
      `items/${id}/`,
      {
        profile_id: userProfile[0].id,
        available: true
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${window.localStorage["token"]}`
        }
      }
    ).catch(err => {
      alert("Error");
    });
  };

  render() {
    const { id, name, price, available } = this.props;

    return (
      <tr>
        <td>{name.toUpperCase()}</td>
        <td>{price.toUpperCase()}</td>
        <td>Available: {JSON.stringify(available).toUpperCase()}</td>
        <td>
          <Button
            className="btn btn-default reset-item-availablity"
            onClick={this.resetItemAvailability}
          >
            {" "}
            Reset Item Availablity
          </Button>
        </td>
      </tr>
    );
  }
}

export default ItemGrid;
