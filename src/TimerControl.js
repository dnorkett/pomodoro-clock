import React from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';

class TimerControl extends React.Component {
    constructor(props) {
      super(props);    
    }
  
    render() {
      return (
        <div className="timerControlContainer" id={this.props.componentId}>
          <p className="timerControlDisplay">{this.props.componentTitle}</p>
          <div className="controls">
            <button id={this.props.decrementId} onClick={() => this.props.decrementFunction(this.props.timerType)}>
              <i className="fa fa-arrow-down"></i> 
            </button>
              
            <span className="timerControlDisplay" id={this.props.lengthId}>{this.props.length}</span>
            
            <button id={this.props.incrementId} onClick={() => this.props.incrementFunction(this.props.timerType)}>
              <i className="fa fa-arrow-up"></i>
            </button>
          </div>
        </div>
      )
    }
  }

  export default TimerControl;