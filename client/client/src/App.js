import React, { Component } from 'react';
import './App.css';
import People from './Components/People';
import Groups from './Components/Groups';
import EditGroupPage from './Components/EditGroupPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Jumbotron, Container, Navbar, Nav } from 'react-bootstrap';


class App extends Component {

  state = {
    members:[],
    groups:[],
  };

  constructor(props) {
    super(props);
    this.setGroupState = this.setGroupState.bind(this);
  }

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

  setGroupState(group){
    console.log("group");
  }

  render() {
    return (
      <Router>
        <div>
          <Container>
            <Navbar bg="light">
              <Nav className="mr-auto">
                  <Nav.Link as="span">
                    <Link to="/">Home</Link>
                  </Nav.Link>
                  <Nav.Link as="span">
                    <Link to="/people">People</Link>
                  </Nav.Link>
                  <Nav.Link as="span">
                    <Link to="/groups">Groups</Link>
                  </Nav.Link>
              </Nav>
            </Navbar>
          </Container>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/people">
              <People data = {this.state}/>
            </Route>
            <Route exact path="/groups">
              <Groups data = {this.state}/>
            </Route>
            <Route path="/group/:groupId/edit">
              <EditGroupPage groups = {this.state.groups} />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function Home() {
  return (
    <Container>
      <Jumbotron>
        <h1>This is a homepage</h1>
      </Jumbotron>
    </Container>
  )
}

export default App;
