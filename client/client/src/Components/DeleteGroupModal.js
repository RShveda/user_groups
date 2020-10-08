import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


class DeleteGroupModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.item.name,
      description: props.item.description,
      anyMember: props.anyMember,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    fetch('http://127.0.0.1:8000/groups/' + this.props.item.id + '/', {
        headers: {'Content-Type': 'application/json'},
        method: 'DELETE',
        body: JSON.stringify(this.state)
      }).then(function(response) {
        console.log(response)
        return response.text();
      });
  }

  render() {
    const anyMember = this.state.anyMember;
    let button;
    let message;
    if (anyMember){
      message = <h4>You cannot delete group with members</h4>;
    } else {
      button = <Button type="submit">Submit</Button>;
      message = <h4>Are you sure you wan to delete {this.state.name}?</h4>;
    }
    return(
      <Modal
            show={this.props.show}
            onHide = {this.props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Delete person
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {message}
              <Form onSubmit={this.handleSubmit}>
                {button}
                <Button className="float-right" variant="danger" onClick={this.props.onHide}>Cancel</Button>
              </Form>
            </Modal.Body>
          </Modal>
    )
  }
}

export default DeleteGroupModal;
