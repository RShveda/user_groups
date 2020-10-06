import React, { Component } from 'react';

class People extends Component{
  render() {
    return (
      <div>
        This is people page!
        <AddPerson />
         {this.props.data.members.map(item => (
           <div key={item.id}>
             <div>{item.username}</div>
             <div>{item.group}</div>
           </div>
         ))}
      </div>
    );
  }
}

class AddPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.username);
    fetch('http://127.0.0.1:8000/members/', {
        method: 'POST',
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify(this.state)
      }).then(function(response) {
        console.log(response)
        return response.json();
      });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} name ="username" onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default People;
