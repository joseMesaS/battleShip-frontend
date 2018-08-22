import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import GameComponent from './components/GameComponent'
import HomeComponent from './components/HomeComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={HomeComponent} />
            <Route exact path="/games/:id" component={GameComponent} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
