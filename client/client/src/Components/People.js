import React, { Component } from 'react';
import { Button, Table, Container, Form, Col } from 'react-bootstrap';
import EditPersonModal from './EditPersonModal';
import DeletePersonModal from './DeletePersonModal';


class People extends Component{
  constructor(props) {
    super(props);
    this.state = {
      editModals:{},
      deleteModals:{},
    };
    this.setEditModalShow = this.setEditModalShow.bind(this);
    this.setDeleteModalShow = this.setDeleteModalShow.bind(this);
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
      <Container>
        <h1>This is people page!</h1>
        <h5>You may add new person:</h5>
        <AddPerson groups = {this.props.data.groups}/>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
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
                <td>{item.group_name}</td>
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
      </Container>
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
    fetch('http://127.0.0.1:8000/members/', {
        method: 'POST',
        body: JSON.stringify(this.state)
      }).then(function(response) {
        return response.json();
      });
  }

  render() {
    return (
      <Col lg={6}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" value={this.state.username} name="username" onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Pick a group</Form.Label>
              <Form.Control as="select" value={this.state.group} name ="group" onChange={this.handleChange}>
                <option value="">----</option>
                {this.props.groups.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </Form.Control>
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
        <br/>
      </Col>
    );
  }
}

export default People;
