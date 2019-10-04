import React from 'react';

class Time extends React.Component {
    state = { 
        time: []
     }
     getTime = () => { 
        let fullTime = []
           fullTime.push(this.props[0])
           fullTime.push(this.props[1])
           fullTime.push(this.props[2])
           fullTime.push(this.props[3])
           fullTime.push(this.props[4])
         let cleanedTime = fullTime.map(num => { 
            if (num !== undefined ) { 
                return num 
            }
         })
        let formattedTime = cleanedTime.join("")
        let addAmOrPm = formattedTime.split(":")
        let timeOfDay = ""; 
        if (addAmOrPm[0] < 12) { 
            timeOfDay = "AM"; 
        } else if (addAmOrPm[0] > 12) { 
            addAmOrPm[0] = addAmOrPm[0] - 12; 
            timeOfDay = " PM"; 
            formattedTime = addAmOrPm.join(":")
        }

        formattedTime = formattedTime + timeOfDay 

        this.setState({ time: [...this.state.time, formattedTime] });
     
     }
     componentDidMount = () => { 
        this.getTime()
     }
    render() { 
        
        return ( 
        <div className="rcw-client-time"> 
            <div> {this.state.time[0]} </div>
        </div> );
    }
}
 
export default Time;