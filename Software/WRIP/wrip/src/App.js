import './App.css';
import {useState} from 'react';
import RouteEingeben from './components/RouteForm/routeForm'
import Example from './components/DateForm/dateForm'
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
