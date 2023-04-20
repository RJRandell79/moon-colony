import * as React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.scss';

import Home from './Home';
import Power from './departments/Power';
import Refinery from './departments/Refinery';

//source ~/.nvm/nvm.sh

const App = () => {
  
  const [dateTime, setDateTime] = useState(
    new Date(Date.UTC(1970, 0, 1, 0, 0, 0, 0))
  );
  const [elements, setElements] = useState(
    [
      { element: 'Aluminum', amount: 0, rate: 0 },
      { element: 'Calcium', amount: 0, rate: 0 },
      { element: 'Hydrogen', amount: 0, rate: 3 },
      { element: 'Iron', amount: 0, rate: 1 },
      { element: 'Magnesium', amount: 0, rate: 0 },
      { element: 'Oxygen', amount: 0, rate: 0 },
      { element: 'Potassium', amount: 0, rate: 0 },
      { element: 'Silicon', amount: 0, rate: 0 },
      { element: 'Sodium', amount: 0, rate: 0 },
      { element: 'Titanium', amount: 0, rate: 0 }
    ]
  );
  const [refineryActive, setRefineryActive] = useState('0');
  
  const toggleRefineryActive = (value) => {
    setRefineryActive(value);
  }

  /*
  const mineElements = () => {
    if(refineryActive !== '0') {
      const updatedElements = this.state.elements.map((element) => {
          return { ...element, amount: element.amount + element.rate }
      });
      this.setState({ elements: updatedElements });
      console.log('mining');
    }
  }
  */

  const advanceDay = () => {
    const newDate = new Date(dateTime);
    newDate.setDate(newDate.getDate() + 1);
    setDateTime(newDate);
    //this.mineElements();
    console.log('day+');
  }

  const advanceHour = () => {
    const newTime = new Date(dateTime);
    newTime.setTime(newTime.getTime() + 3600000);
    setDateTime(newTime);
    console.log('hour+');
  }

  useEffect(() => {
    const interval = setInterval(
      () => setDateTime((dateTime) => {
        const newSecond = new Date(dateTime);
        newSecond.setSeconds(newSecond.getSeconds() + 1);
        return newSecond;
      }), 1000);
      return () => clearInterval(interval);
  }, []);  

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
                <button type="button" onClick={() => advanceDay()}>Advance day</button>
              </li>
              <li>
                <button type="button" onClick={() => advanceHour()}>Advance hour</button>
              </li>
              <li>
                <p>{dateTime.toUTCString().slice(5, -4)} </p>
              </li>
            </ul>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="power" element={<Power />} />
            <Route path="refinery" element={<Refinery elements={elements} />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
  
}

export default App;
