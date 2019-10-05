import React from 'react';

class Time extends React.Component {
  state = {
    time: [],
    sender: this.props.sender,
    senderClass: this.props.sender === "client" ? "rcw-client-time" : "rcw-response-time" , 
  };
  getTime = () => {
    let splitTime = this.props.messageTime.split(":");
    splitTime.pop() 
    let timeOfDay = ""; 
    let formattedTime = "";  
    if (splitTime[0] < 12) {
        timeOfDay = "AM";
    } else if (splitTime[0] > 12) {
        splitTime[0] = splitTime[0] - 12;
        timeOfDay = " PM";
        formattedTime = splitTime.join(":");
        formattedTime = formattedTime + timeOfDay;
    }


    this.setState({ time: [...this.state.time, formattedTime] });
  };
  componentDidMount = () => {
    this.getTime();
  };
  render() {
    return (
      <div className={this.state.senderClass}>
        <div> {this.state.time[0]}</div>
      </div>
    );
  }
}
 
export default Time;