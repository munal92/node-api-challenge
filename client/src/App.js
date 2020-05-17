import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from "./components/Home"
import NavBar from "./components/NavBar"
import {Route,Switch} from 'react-router-dom';
import ProjectsList from './components/ProjectsList';
import Project from './components/Project';
import EachProj from './components/EachProj';




function App() {
  return (
    <div className="App">
      <NavBar/>
      <Switch>

      <Route path='/projectslist/:id'>
     <EachProj/>
      </Route>

      <Route path="/projectslist">
      <ProjectsList />
      </Route>     

      <Route path="/">
      <Home />
      </Route>

      </Switch>
    </div>
  );
}

export default App;
