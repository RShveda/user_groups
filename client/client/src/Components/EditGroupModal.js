import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


class EditGroupModal extends React.Component {
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
    fetch('http://127.0.0.1:8000/groups/' + this.props.item.id + '/', {
        method: 'PUT',
        body: JSON.stringify(this.state)
      }).then(function(response) {
        return response.json();
      });
  }

  render() {
    return(
      <Modal
            show={this.props.show}
            onHide = {this.props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit person
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>{this.state.name}</h4>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>Edit name:</Form.Label>
                  <Form.Control type="text" value={this.state.name} name ="name" onChange={this.handleChange} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Edit description:</Form.Label>
                  <Form.Control as="textarea" rows="3" value={this.state.description} name ="description" onChange={this.handleChange} />
                </Form.Group>

                <Button type="submit">Submit</Button>
                <Button className="float-right" variant="danger" onClick={this.props.onHide}>Cancel</Button>
              </Form>
            </Modal.Body>
          </Modal>
    )
  }
}

export default EditGroupModal;
