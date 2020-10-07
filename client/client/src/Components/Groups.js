import React, { Component } from 'react';

class Groups extends Component{
  render() {
    return (
      <div>
        This is Groups page!
        Add a new group:
        <AddGroup />
        <br/>
         {this.props.data.groups.map(item => (
           <div key={item.id}>
             <hr />
             <hr />
             <hr />
             <div>{item.name}</div>
             <div>{item.description}</div>
             <hr />
             <EditGroup item={item}/>
             <DeleteGroup item={item}/>
           </div>
         ))}
      </div>
    );
  }
}

class AddGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.name);
    fetch('http://127.0.0.1:8000/groups/', {
        method: 'POST',
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
          <input type="text" value={this.state.name} name ="name" onChange={this.handleChange} />
        </label>
        <label>
          Description:
          <textarea value={this.state.description} name ="description" onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class EditGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.item.name,
      description: props.item.description,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.name);
    fetch('http://127.0.0.1:8000/groups/' + this.props.item.id + '/', {
        method: 'PUT',
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
          <input type="text" value={this.state.name} name ="name" onChange={this.handleChange} />
        </label>
        <label>
          Description:
          <textarea value={this.state.description} name ="description" onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class DeleteGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.item.name,
      description: props.item.description,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('Item was submitted for deletion ');
    fetch('http://127.0.0.1:8000/groups/' + this.props.item.id + '/', {
        headers: {'Content-Type': 'application/json'},
        method: 'DELETE',
        body: JSON.stringify(this.state)
      }).then(function(response) {
        console.log(response)
        return response.text();
      });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="submit" value="Delete" />
      </form>
    );
  }
}

export default Groups;
