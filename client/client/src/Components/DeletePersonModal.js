import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


class DeletePersonModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.item.username,
      group: props.item.group,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    fetch('http://127.0.0.1:8000/members/' + this.props.item.id + '/', {
        headers: {'Content-Type': 'application/json'},
        method: 'DELETE',
        body: JSON.stringify(this.state)
      }).then(function(response) {
        return response.text();
      });
      // TODO: needs to be refactored to prevent form default behaviour which send
      // unnecessary requests to back-end causing server error
      // see EditGroupPage for possible refactor strategy
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
                Delete person
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Are you sure you wan to delete {this.state.username}?</h4>
              <Form onSubmit={this.handleSubmit}>
                <Button type="submit">Submit</Button>
                <Button className="float-right" variant="danger" onClick={this.props.onHide}>Cancel</Button>
              </Form>
            </Modal.Body>
      </Modal>
    )
  }
}

export default DeletePersonModal;
