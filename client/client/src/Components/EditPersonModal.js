import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';


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
        body: JSON.stringify(this.state)
      }).then(function(response) {
        console.log(response)
        return response.json();
      });

  }

  render() {
    return(
      <Modal
            show={this.props.show}
            onHide = {this.props.onHide}
            size="lg"
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
                <Button type="submit">Submit</Button>
                <Button variant="danger" onClick={this.props.onHide}>Cancel</Button>
              </form>
            </Modal.Body>
          </Modal>
    )
  }
}

export default EditPersonModal;
