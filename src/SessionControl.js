import React from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';

class SessionControl extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div>
            <button id="start_stop" onClick={this.props.timerFunction}>
              <i className="fa fa-play"></i>  <i className="fa fa-pause"></i> 
            </button>
            <button id="reset" onClick={this.props.resetFunction}>
              <i className="fa fa-refresh"></i>
            </button>
        </div>
      )
    }
  }

  export default SessionControl;