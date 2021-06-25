import React from "react";
import Alerts from "./Alerts";

class AlertIntervals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertInterval: 60000,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    this.setState({alertInterval: evt.target.value});
  }

  render() {
    return (
      <div>
        <div>
        <h3>Change Time of Alerts</h3>
        <form>
          <button type="button" value={60000} onClick={this.handleClick}>
            1 Minute
          </button>
          <button type="button" value={180000} onClick={this.handleClick}>
            3 Minutes
          </button>
          <button type="button" value={300000} onClick={this.handleClick}>
            5 Minutes
          </button>
          <button type="button" value={600000} onClick={this.handleClick}>
            10 Minutes
          </button>
        </form>
        <p>
          Posture Alerts Every {this.state.alertInterval / 60000} Minutes
        </p>
        </div>
        <Alerts initialAveragePosture={this.props.initialAveragePosture} poses={this.props.poses} alertInterval={this.state.alertInterval} />
      </div>
    );
  }
}

export default AlertIntervals;
