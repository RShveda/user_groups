import React, { Component } from 'react';
import './App.css';
import People from './Components/People';
import Groups from './Components/Groups';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {

  state = {
    members:[],
    groups:[],
  };

  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/members/');
      const members = await res.json();
      this.setState({
        members
      });
    } catch (e) {
      console.log(e);
    }
    try {
      const res = await fetch('http://127.0.0.1:8000/groups/');
      const groups = await res.json();
      this.setState({
        groups
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/People">People</Link>
              </li>
              <li>
                <Link to="/Groups">Groups</Link>
              </li>
            </ul>
          </nav>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/People">
              <People data = {this.state}/>
            </Route>
            <Route path="/Groups">
              <Groups data = {this.state}/>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function Home() {
  return <h2>This is homepage</h2>;
}

export default App;
