import React from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { Redirect, withRouter } from "react-router-dom";


class EditGroupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: (props.location.state ? props.location.state.name : ""),
      description: (props.location.state ? props.location.state.description : ""),
      id: this.props.match.params.groupId,
      redirectToReferrer: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    fetch('http://127.0.0.1:8000/groups/' + this.props.match.params.groupId + '/', {
        method: 'GET',
      }).then(function(response) {
        return response.json();
      }).then((response)=>
    {
      this.setState(response)
    });
    console.log(this.state);
  }


  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault()
    try {
        await fetch('http://127.0.0.1:8000/groups/' + this.props.match.params.groupId + '/',{
          method: 'PUT',
          body: JSON.stringify(this.state)
        }
      );
    } catch (e) {
      alert(e);
    }
    this.setState({redirectToReferrer:true})

  }

  render() {
    if (this.state.redirectToReferrer) {
            return <Redirect to="/groups" />
        }
    return(
            <Container>
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
                <Button href="/groups" className="float-right" variant="danger">
                  Back
                </Button>
              </Form>
            </Container>

    )
  }
}

export default withRouter(EditGroupPage);
