import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import  axios from 'axios';

class Login extends Component {

  constructor(props){
    super(props);
    this.state={
      email:"",
      password:""
    }
  }

  login(){
    console.log("email");
    console.log("email", this.state.email);
    console.log("password", this.state.password);
    if (this.state.email === "" && this.state.password==="")
    {
      alert("no data");
    }
    else
    {
      axios.post("http://localhost:8000/admin/auth", {
        email:this.state.email,
        password:this.state.password
      }).then(res=>{
        console.log(res.data)

        if(res.data['data'] === null){
          alert("password or email are incorrect")
        }
        else
        {
          console.log("token ", res.data['data']['token']);
          console.log("id admin ", res.data['data']['user']['_id']);
         // console.log("token ", res.data['data']['user']);
          localStorage.setItem("token",res.data['data']['token']);
        localStorage.setItem("idAdmin",res.data['data']['user']['_id']);
        window.location.href="/#/home/association";
        }
      })
    }
    this.setState({email:""})
    this.setState({password:""})
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>

                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username"
                               value={this.state.email} onChange={evt=> this.setState({email: evt.target.value})}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password"
                               value={this.state.password} onChange={evt=> this.setState({password: evt.target.value})}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.login.bind(this)}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>

                  </CardBody>
                </Card>

              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
