import React from 'react';
import './App.css';
import TimerControl from './TimerControl';
import SessionControl from './SessionControl';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         timer: 1500,
         breakLength: 300,
         sessionLength: 1500,
         timerStatus: 'stopped',
         timerType: 'Session'
    };
    this.convertToClock = this.convertToClock.bind(this);  
    this.reset = this.reset.bind(this);    
    this.decrementTimer = this.decrementTimer.bind(this);
    this.incrementTimer = this.incrementTimer.bind(this);
    this.startStopTimer = this.startStopTimer.bind(this);
    this.tick = this.tick.bind(this);    
  }

  convertToClock() {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = Math.floor(this.state.timer % 60);

    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
  }

  reset() {
    clearInterval(this.intervalID);
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;

    this.setState({
      timer: 1500,
      breakLength: 300,
      sessionLength: 1500,
      timerStatus: 'stopped',
      timerType: 'Session'
    });
  }

  decrementTimer(timerType) {
    if (this.state.timerStatus == 'stopped') {
      switch (timerType) {
        case 'breakLength':
          this.setState({
            breakLength: this.state.breakLength >= 120 ? this.state.breakLength - 60 : this.state.breakLength
          });
          break;
        case 'sessionLength':
          this.setState({
            sessionLength: this.state.sessionLength >= 120 ? this.state.sessionLength - 60 : this.state.sessionLength,
            timer: this.state.sessionLength >= 120 ? this.state.sessionLength - 60 : this.state.sessionLength,
          });
          break;
      }
    }
  }

  incrementTimer(timerType) {
    if (this.state.timerStatus == 'stopped') {
      switch (timerType) {
        case 'breakLength':
          this.setState({
            breakLength: this.state.breakLength <= 3540 ? this.state.breakLength + 60 : this.state.breakLength
          });
          break;
        case 'sessionLength':
          this.setState({
            sessionLength: this.state.sessionLength <= 3540 ?  this.state.sessionLength + 60 : this.state.sessionLength,
            timer: this.state.sessionLength <= 3540 ?  this.state.sessionLength + 60 : this.state.sessionLength
          });
          break;
      }
    }
  }

  startStopTimer() {
    if (this.state.timerStatus == 'stopped') {
      this.intervalID = setInterval(() => this.tick(), 1000);
      this.setState({timerStatus: 'running'});
    }

    if (this.state.timerStatus == 'running') {
      clearInterval(this.intervalID);
      this.setState({timerStatus: 'stopped'});
    }    
  }

  tick() {
    if (this.state.timer > 0) {
      this.setState({
        timer: this.state.timer - 1
      })
    } else if(this.state.timer == 0) {
        this.audioBeep.play();
        clearInterval(this.intervalID);

      if (this.state.timerType == 'Session') {
        this.setState({
          timerStatus: 'stopped',
          timerType: 'Break',
          timer: this.state.breakLength,
        }, this.startStopTimer);
        
      } else {
        this.setState({
          timerStatus: 'stopped',
          timerType: 'Session',
          timer: this.state.sessionLength
        }, this.startStopTimer);        
      }      
    }
  }
  
  render() {
    return (
      <div id="main_app">
        <h1 id="pageTitle"> Pomodoro Clock </h1>
        <div id="timerControls" className="controls">
          <TimerControl 
            length={this.state.breakLength / 60}
            componentId='break-label'
            componentTitle='Break Length'
            lengthId="break-length"
            decrementId='break-decrement'
            incrementId='break-increment'    
            timerType='breakLength'               
            decrementFunction={this.decrementTimer}
            incrementFunction={this.incrementTimer}
            />
          <TimerControl 
            length={this.state.sessionLength / 60}
            componentId='session-label'
            componentTitle='Session Length'
            lengthId="session-length"            
            decrementId='session-decrement'
            incrementId='session-increment'
            timerType='sessionLength'                                              
            decrementFunction={this.decrementTimer}
            incrementFunction={this.incrementTimer}
            />
        </div>
        <div id="timerDisplay">
          <p id="timer-label"> {this.state.timerType} </p>
          <p id="time-left"> {this.convertToClock()} </p>
        </div>
        
        <div id="sessionControls" className="controls">
          <SessionControl 
            resetFunction={this.reset}
            timerFunction={this.startStopTimer}
          />
          <audio id="beep" preload="auto" src="https://donnorkett.com/files/sounds/Simple-alert-bells-tone.mp3" ref={(audio) => { this.audioBeep = audio; }}/>     
        </div>       
      </div>
    );
  }
}

export default App;
