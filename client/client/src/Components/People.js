import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import EditPersonModal from './EditPersonModal';

class People extends Component{

  constructor(props) {
    super(props);
    this.setEditModalShow = this.setEditModalShow.bind(this);
    this.setDeleteModalShow = this.setDeleteModalShow.bind(this);
    this.state = {
      editModals:{},
      deleteModals:{},
    };
  }

  setEditModalShow(bool, id) {
    var editModals = this.state.editModals
    editModals[id] = bool
    this.setState({editModals});
  }

  setDeleteModalShow(bool, id) {
    this.deleteModals.setState({id: bool});
  }

  render() {
    return (
      <div>
        This is people page!
        <AddPerson groups = {this.props.data.groups}/>
        <br/>
         {this.props.data.members.map(item => (
           <div key={item.id}>
             <hr />
             <hr />
             <hr />
             <div>{item.username}</div>
             <div>{item.group}</div>
             <hr />
             <EditPerson item={item} groups = {this.props.data.groups}/>
             <DeletePerson item={item}/>
             <Button variant="primary" onClick={() => this.setEditModalShow(true, item.id)}>
              Edit Modal
             </Button>
             <EditPersonModal show={this.state.editModals[item.id]} onHide={() => this.setEditModalShow(false, item.id)} item={item} groups = {this.props.data.groups} />
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
      username: '',
      group: undefined,
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
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.username} name ="username" onChange={this.handleChange} />
        </label>
        <label>
          Pick a group:
          <select value={undefined} name = "group" onChange={this.handleChange}>
          <option value={undefined}>----</option>
            {this.props.groups.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class EditPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.item.username,
      group: props.item.group,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    fetch('http://127.0.0.1:8000/members/' + this.props.item.id + '/', {
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
          <input type="text" value={this.state.username} name ="username" onChange={this.handleChange} />
        </label>
        <label>
          Pick a group:
          <select value={this.state.group || undefined} onChange={this.handleChange}>
            <option value={undefined}>----</option>
            {this.props.groups.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class DeletePerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.item.username,
      group: props.item.group,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('Item was submitted for deletion ');
    fetch('http://127.0.0.1:8000/members/' + this.props.item.id + '/', {
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


export default People;
