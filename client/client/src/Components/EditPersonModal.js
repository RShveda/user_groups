import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


class EditPersonModal extends React.Component {
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
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        return response.json();
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
                Edit person
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>{this.state.username}</h4>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>Edit user name:</Form.Label>
                  <Form.Control type="text" value={this.state.username} name="username" onChange={this.handleChange} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Pick a group:</Form.Label>
                  <Form.Control as="select" value={this.state.group || undefined} name ="group" onChange={this.handleChange}>
                    <option value="">----</option>
                    {this.props.groups.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Button type="submit">Submit</Button>
                <Button className="float-right" variant="danger" onClick={this.props.onHide}>Cancel</Button>
              </Form>
            </Modal.Body>
          </Modal>
    )
  }
}

export default EditPersonModal;
