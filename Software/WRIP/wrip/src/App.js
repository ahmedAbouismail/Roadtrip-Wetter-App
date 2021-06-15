import './App.css';
import {useState} from 'react';
import RouteEingeben from './components/RouteForm/routeForm'
import Example from './components/DateForm/dateForm'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import RoutePlaning from './components/pages/RoutePlaning';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about' component={About} />
          <Route path='/routePlaning' component={RoutePlaning} />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
