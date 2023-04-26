import * as React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.scss';

import Home from './Home';
import Power from './departments/Power';
import Refinery from './departments/Refinery';
import Support from './departments/Support';
import Research from './departments/Research';

//source ~/.nvm/nvm.sh

const App = () => {
  
  const [dateTime, setDateTime] = useState(
    new Date(Date.UTC(1970, 0, 1, 0, 0, 0, 0))
  );
  let [currentPopulation, setCurrentPopulation] = useState({ population: 30, rate: 0.01 });
  const [currentPowerOutput, setCurrentPowerOutput] = useState(10);
  const [currentPowerDemand, setCurrentPowerDemand] = useState(0);
  const [powerPlants, setPowerPlants] = useState(
    [
      { id: 1, powerplant: 'Batteries', output: 10, total: 1, installed: true },
      { id: 2, powerplant: 'Mk I', output: 100, total: 1, installed: false },
      { id: 3, powerplant: 'Mk II', output: 200, total: 0, installed: false },
      { id: 4, powerplant: 'Mk III', output: 400, total: 0, installed: false },
      { id: 5, powerplant: 'Mk IV', output: 800, total: 0, installed: false },
      { id: 6, powerplant: 'Mk V', output: 1600, total: 0, installed: false }
    ]
  );
  const [elements, setElements] = useState(
    [
      { element: 'Aluminum', amount: 0, rate: 13 },
      { element: 'Calcium', amount: 0, rate: 11 },
      { element: 'Iron', amount: 0, rate: 13 },
      { element: 'Magnesium', amount: 0, rate: 6 },
      { element: 'Oxygen', amount: 0, rate: 43 },
      { element: 'Potassium', amount: 0, rate: 1 },
      { element: 'Silicon', amount: 0, rate: 21 },
      { element: 'Sodium', amount: 0, rate: 1 },
      { element: 'Titanium', amount: 0, rate: 3 }
    ]
  );
  const [refineryActive, setRefineryActive] = useState('0');

  const [researchProjects, setResearchProjects] = useState(
    [
      { id: 'c0', category: 'Colonisation', projects: [

      ]},
      { id: 't0', category: 'Transportation', projects: [ 
        { id: 't1', projectname: 'Probe', researchtime: 7, buildtime: 3, completed: true, available: true, active: false, elements: [
          { element: 'Aluminum', amount: 1 },
          { element: 'Titanium', amount: 3 }
        ] },
        { id: 't2', projectname: 'Grazer', researchtime: 14, buildtime: 5, completed: false, available: true, active: false },
      ]},
      { id: 'w0', category: 'Weapons', projects: [

      ]},
      { id: 'p0', category: 'Power', projects: [ 
        { id: 'p1', projectname: 'Mk I', researchtime: 7, buildtime: 7, completed: false, available: true, active: false },
        { id: 'p2', projectname: 'Mk II', researchtime: 14, buildtime: 14, completed: false, available: false, active: false },
        { id: 'p3', projectname: 'Mk III', researchtime: 21, buildtime: 21, completed: false, available: false, active: false },
        { id: 'p4', projectname: 'Mk IV', researchtime: 28, buildtime: 28, completed: false, available: false, active: false },
        { id: 'p5', projectname: 'Mk V', researchtime: 35, buildtime: 35, completed: false, available: false, active: false }
      ]},
      { id: 's0', category: 'Supplemental', projects: [

      ]}
    ]
  );

  const increasePopulation = () => {
    const newPopulation = (currentPopulation.population + currentPopulation.rate);
    setCurrentPopulation({ ...currentPopulation, population: newPopulation, rate: currentPopulation.rate });
  }

  const installPower = (selected_id) => {
    const updatedPower = powerPlants.map((powerplant) => {
      if (selected_id === powerplant.id) {
        setCurrentPowerOutput(powerplant.output);
        if(powerplant.output < 35) {
          setCurrentPowerDemand(0);
          setRefineryActive('0');
        }
        return { ...powerplant, installed: true }
      }
      return { ...powerplant, installed: false }
    });
    setPowerPlants(updatedPower);
  }
  
  const toggleRefining = (value) => {
    if(currentPowerOutput < 35) {
      alert('Not enough power!');
    } else if(currentPopulation.population < 30) {
      alert('Not enough people to work refinery');
    } else {
      setCurrentPowerDemand(35);
      setRefineryActive(value);
    }
  }

  const mineElements = () => {
    if(refineryActive !== '0' && currentPowerOutput >= 35) {
      const updatedElements = elements.map((element) => {
          return { ...element, amount: element.amount + element.rate }
      });
      setElements(updatedElements);
      console.log('mining');
    }
  }

  const advanceDay = () => {
    const newDate = new Date(dateTime);
    newDate.setDate(newDate.getDate() + 1);
    setDateTime(newDate);
    mineElements();
    increasePopulation();
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
                <Link to="/research">Research</Link>
              </li>
              <li>
                <Link to="/support">Support</Link>
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
            <Route path="power" element={<Power powerplants={powerPlants} currentPowerOutput={currentPowerOutput} currentPowerDemand={currentPowerDemand} installPower={installPower} />} />
            <Route path="refinery" element={<Refinery elements={elements} refineryActive={refineryActive} toggleRefining={toggleRefining} />} />
            <Route path="research" element={<Research researchprojects={researchProjects} />} />
            <Route path="support" element={<Support currentPopulation={currentPopulation} />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
  
}

export default App;
