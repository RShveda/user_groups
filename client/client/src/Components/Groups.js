import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import EditGroupModal from './EditGroupModal';
import DeleteGroupModal from './DeleteGroupModal';


class Groups extends Component{
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
      <div>
        This is Groups page!
        Add a new group:
        <AddGroup />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Members</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
            <tbody>
             {this.props.data.groups.map(item => (
               <tr key={item.id}>
                 <td>{item.id}</td>
                 <td>{item.name}</td>
                 <td>{item.members_count}</td>
                 <td>{item.description}</td>
                 <td>
                 <Button variant="primary" onClick={() => this.setEditModalShow(true, item.id)}>
                  Edit Group
                 </Button>
                 <EditGroupModal
                   show={this.state.editModals[item.id]}
                   onHide={() => this.setEditModalShow(false, item.id)}
                   item={item}
                 />
                 <Button variant="danger" onClick={() => this.setDeleteModalShow(true, item.id)}>
                  Delete Group
                 </Button>
                 <DeleteGroupModal
                   show={this.state.deleteModals[item.id]}
                   onHide={() => this.setDeleteModalShow(false, item.id)}
                   item={item}
                   anyMember = {item.members_count}
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
    fetch('http://127.0.0.1:8000/groups/', {
        method: 'POST',
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

export default Groups;
