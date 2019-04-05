import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row ,FormText, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import  axios from 'axios';

////session
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

class Login extends Component {

  constructor(props){
    super(props);
    this.state={
      email:"",
      emailErr:"",
      password:"",
      passwordErr:"",
      warning: false,
      redirectToReferrer: "0",
    }
    //this.toggleWarning = this.toggleWarning.bind(this);
  }

  toggleWarningClose =()=> {
    this.setState({
      warning: !this.state.warning,
    });
  }

  validate = () => {

    let isError = false;

    const errors = {
      emailErr: "",
      passwordErr: "",
    }

    console.log("login ",this.state.login);
    console.log("pws ",this.state.password);



    const regex1=/^[a-zA-Z0-9._-]+$/;
    const regexEmail=/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}/igm;


    if ((this.state.email==="")||(this.state.email.length > 25)||!regexEmail.test(this.state.email)) {

      isError = true;
      errors.emailErr = "Veuillez verifier votre login";
    }


    if ((this.state.password==="")||(this.state.password.length > 20)||!regex1.test(this.state.password)) {

      isError = true;
      errors.passwordErr = "veuillez verifier votre mot de passe";
    }



    if (isError) {
      this.setState({
        ...this.state,
        ...errors
      })
    }

    console.log("errrr ", isError)


    this.setState({
      erreur:isError
    })

    return isError;
  }

  login(){
    console.log("email");
    console.log("email", this.state.email);
    console.log("password", this.state.password);
    let err=this.validate();

    if(!err){
      axios.post("http://localhost:8000/auth", {
        email:this.state.email,
        password:this.state.password
      }).then(res=>{
        console.log(res.data)

        if(res.data['data'] === null){
          //alert("password or email are incorrect")
          this.toggleWarningClose();
        }
        else
        {
          console.log("token ", res.data['data']['token']);
          console.log("id admin ", res.data['data']['user']['_id']);
         // console.log("token ", res.data['data']['user']);
          localStorage.setItem("token",res.data['data']['token']);
        localStorage.setItem("type",res.data['data']['user']['type']);

        if(localStorage.getItem("type")==="admin"){

          localStorage.setItem("idAdmin",res.data['data']['user']['_id']);

        localStorage.setItem("token12", "true");


          ///session

          fakeAuth.authenticate(() => {

            this.setState(() => ({
              redirectToReferrer: "1"
            }))

          })


          //  window.location.href="/#/home/association";

        }
        else if(localStorage.getItem("type")==="association"){
          localStorage.setItem("idAssociation",res.data['data']['user']['_id']);
          localStorage.setItem("imageAssociation",res.data['data']['user']['imageAssociation'])
          console.log("id association: ",localStorage.getItem("idAssociation"));
          //console.log("img association: ",localStorage.getItem("imageAssociation"));
       //   window.location.href="/#/home/benevoles/membre";

        localStorage.setItem("token12", "true");


          ///session

          fakeAuth.authenticate(() => {

            this.setState(() => ({
              redirectToReferrer: "2"
            }))

          })


        }
        else{
          //alert("votre incorrect");
          this.toggleWarningClose();
        }
        }
      })
    }
    this.setState({email:""})
    this.setState({password:""})
  }

  render() {
    const {redirectToReferrer} = this.state;

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
                        <Input type="email" id="hf-email" name="hf-email" placeholder="Entrer Email..." autoComplete="email"
                               value={this.state.email} onChange={evt=> this.setState({email: evt.target.value})}/>
                      </InputGroup>
                    {
                      this.state.erreur===false ?
                        <FormText >{this.state.emailErr}</FormText>:null
                    }
                    {
                      this.state.erreur===true ?
                        <FormText id ="colorEr" className="help-block">{this.state.emailErr}</FormText>:null
                    }
                    <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password"
                               value={this.state.password} onChange={evt=> this.setState({password: evt.target.value})}/>
                      </InputGroup>
                    {
                      this.state.erreur===false ?
                        <FormText >{this.state.passwordErr}</FormText>:null
                    }
                    {
                      this.state.erreur===true ?
                        <FormText id ="colorEr" className="help-block">{this.state.passwordErr}</FormText>:null
                    }
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={() => {
                            this.props.hettodo(redirectToReferrer);
                            this.login()
                          }}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>

                  </CardBody>
                  <Modal isOpen={this.state.warning} toggle={this.toggleWarning}
                         className={'modal-warning ' + this.props.className}>
                    <ModalHeader toggle={this.toggleWarning}>Erreur D'authentification</ModalHeader>
                    <ModalBody>
                      Vous devez verifier votre Email et Mot de passe  !
                    </ModalBody>
                    <ModalFooter>
                      <Button color="warning" onClick={this.toggleWarningClose}>OK</Button>{' '}
                    </ModalFooter>
                  </Modal>
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
