import React, { Component } from 'react';
import { Button, Table, Container, Col, Form } from 'react-bootstrap';
import DeleteGroupModal from './DeleteGroupModal';
import { Link } from "react-router-dom";


class Groups extends Component{
  constructor(props) {
    super(props);
    this.state = {
      deleteModals:{},
    };
    this.setDeleteModalShow = this.setDeleteModalShow.bind(this);
  }

  setDeleteModalShow(bool, id) {
    var deleteModals = this.state.deleteModals
    deleteModals[id] = bool
    this.setState({deleteModals});
  }

  render() {
    return (
      <Container>
        <h1>This is Groups page!</h1>
        <h5>You may add new group:</h5>
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
                   <Link to={{
                    pathname: `group/${item.id}/edit`,
                    state: { name: item.name, description: item.description, id: item.id }
                   }}>
                    <Button variant="primary">
                      Edit
                    </Button>
                   </Link>
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
      </Container>
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
        return response.json();
      });
  }

  render() {
    return (
      <Col lg={6}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Group name:</Form.Label>
            <Form.Control type="text" value={this.state.name} name ="name" onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Group description:</Form.Label>
            <Form.Control as="textarea" rows="2" value={this.state.description} name ="description" onChange={this.handleChange} />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
        <br/>
      </Col>
    );
  }
}

export default Groups;
