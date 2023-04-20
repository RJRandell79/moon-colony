import * as React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.scss';

import Home from './Home';
import Power from './departments/Power';
import Refinery from './departments/Refinery';

//source ~/.nvm/nvm.sh

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(Date.UTC(1970, 0, 1, 0, 0, 0, 0)),
      refineryActive: '0'
    }
  }

  refineryActive = (value) => {
    this.setState(prevState => ({
      refineryActive: value
    }));
    console.log(this.state.refineryActive);
  }

  advanceDay = () => {
    const newDate = new Date(this.state.date);
    newDate.setDate(newDate.getDate() + 1);
    this.setState(prevState => ({
      date: newDate
    }));
    console.log('day+');
  }

  advanceHour = () => {
    const newTime = new Date(this.state.date);
    newTime.setTime(newTime.getTime() + 3600000);
    this.setState(prevState => ({
      date: newTime
    }));
    console.log('hour+');
  }

  advanceSecond = () => {
    const newSecond = new Date(this.state.date);
    newSecond.setTime(newSecond.getTime() + 1000);
    this.setState(prevState => ({
      date: newSecond
    }));
    //console.log('second+');
  }

  render() {
    setTimeout(() => {
      this.advanceSecond();
    }, 1000);

    return (
      <div className="App">
        <header className="App-header">
          <Router>
            <div className="header-toolbar">
              <ul>
                <li>
                  <Link to="/power">Power</Link>
                </li>
                <li>
                  <Link to="/refinery">Refinery</Link>
                </li>
                <li>
                  <button type="button" onClick={this.advanceDay}>Advance day</button>
                </li>
                <li>
                  <button type="button" onClick={this.advanceHour}>Advance hour</button>
                </li>
                <li>
                  <p>{this.state.date.toUTCString().slice(5, -4)} </p>
                </li>
              </ul>
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="power" element={<Power />} />
              <Route path="refinery" element={<Refinery toggleRefinery={this.refineryActive.bind(this)} refineryActive={this.state.refineryActive} />} />
            </Routes>
          </Router>
        </header>
      </div>
    );
  }
}

export default App;
