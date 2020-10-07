import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import EditPersonModal from './EditPersonModal';
import DeletePersonModal from './DeletePersonModal';

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
    var deleteModals = this.state.deleteModals
    deleteModals[id] = bool
    this.setState({deleteModals});
  }

  render() {
    return (
      <div className="container">
        This is people page!
        <AddPerson groups = {this.props.data.groups}/>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Group</th>
              <th>Join date</th>
              <th>Actions</th>
            </tr>
          </thead>
            <tbody>
            {this.props.data.members.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.group}</td>
                <td>{item.date}</td>
                <td>
                  <Button variant="primary" onClick={() => this.setEditModalShow(true, item.id)}>
                   Edit Person
                  </Button>
                  <EditPersonModal
                    show={this.state.editModals[item.id]}
                    onHide={() => this.setEditModalShow(false, item.id)}
                    item={item}
                    groups = {this.props.data.groups}
                  />
                  <Button variant="danger" onClick={() => this.setDeleteModalShow(true, item.id)}>
                   Delete Person
                  </Button>
                  <DeletePersonModal
                    show={this.state.deleteModals[item.id]}
                    onHide={() => this.setDeleteModalShow(false, item.id)}
                    item={item}
                  />
                </td>
              </tr>
            ))}
            </tbody>
        </Table>
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

export default People;
