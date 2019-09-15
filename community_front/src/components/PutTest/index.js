import React from "react";

class PutTest extends Component {
  state = {
    item: []
  };
  updateItem = () => {};
  render() {
    return (
      <button type="button" onClick={this.updateItem}>
        {" "}
        Update Item{" "}
      </button>
    );
  }
}

export default PutTest;
