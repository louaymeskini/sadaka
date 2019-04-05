import React, { Component } from 'react';
import axios from 'axios';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
  Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';

class ModifierAdmin extends Component {

  constructor(props) {
    super(props);

    //this.toggleWarning = this.toggleWarning.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      admin: {
        nom:"",
        prenom:"",
        email:"",
        username:"",
        password:""
      },
      nom:"",
      nomErr:"",
      prenom:"",
      prenomErr:"",
      email:"",
      emailErr:"",
      username:"",
      usernameErr:"",
      password:"",
      passwordErr:"",
      confirmedpassword:"",
      collapse: true,
      fadeIn: true,
      timeout: 300,
      warning: false
    };
  }

  validate = () => {

    let isError = false;

    const errors = {
      nomErr:"",
      prenomErr:"",
      emailErr: "",
      usernameErr:"",
      passwordErr: "",
      fileErr: "",
    }
    //console.log("login ",this.state.login);
    //console.log("pws ",this.state.password);

    const regex1=/^[a-zA-Z0-9._-]+$/;
    const regexAdresse=/^\s*\S+(?:\s+\S+[a-zA-Z0-9])/;
    const regexEmail=/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}/igm;
    const regexNom=/^[a-zA-Z]*$/;
    const regexNum=/[0-9]+/g;
    const regexImg=/[\/.](gif|jpg|jpeg|tiff|png)$/i;

    if(this.state.nom.length===0){
      isError = false;
    }
    else {
      if ((this.state.nom.length < 2)||!regexNom.test(this.state.nom)) {

        isError = true;
        errors.nomErr = "Veuillez verifier le Nom de l\'Administrateur";
      }
    }

    if(this.state.prenom.length===0){
      isError = false;
    }
    else {
      if ((this.state.prenom.length < 2)||!regexNom.test(this.state.prenom)) {

        isError = true;
        errors.nomErr = "Veuillez verifier le Prenom de l\'Administrateur";
      }
    }

    if(this.state.email.length===0){
      isError = false;
    }
    else {
      if ((this.state.email.length > 25) || !regexEmail.test(this.state.email)) {

        isError = true;
        errors.emailErr = "Veuillez verifier l\'Email du l\'Administrateur";
      }
    }

    if(this.state.username.length===0){
      isError = false;
    }
    else {
      if ((this.state.username.length < 3) || !regex1.test(this.state.username)) {

        isError = true;
        errors.usernameErr = "Veuillez verifier le Username de l\'Administrateur";
      }
    }

    if ((this.state.password != "") && (this.state.password === this.state.confirmedpassword)) {
      isError = false;
    }
    else{
      if ((this.state.password==="")||(this.state.password.length > 20)||(this.state.password.length < 3)||!regex1.test(this.state.password)) {

        //isError = true;
        this.toggleWarningClose();
        //errors.passwordErr = "Veuillez verifier le Mot de passe du l'association";
      }
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

  toggleWarningClose =()=> {
    this.setState({
      warning: !this.state.warning,
    });
  }

  componentDidMount(){
    console.log("id: ",localStorage.getItem("idAdmin"));
    this.getone();
  }

  getone(){
    console.log("getone");
    const headers={
      "content-type":"application/json",
      'x-access-token':localStorage.getItem("token")
    }
    fetch("http://127.0.0.1:8000/admin/"+localStorage.getItem("idAdmin"), {method: 'GET', headers: headers})
      .then(response => response.json())
      .then(data =>{
        console.log(data);

        this.setState({admin:data});

        console.log("admin:", this.state.admin);
      })
  }

  handleEdit() {
    console.log("state: ", this.state)
    const headers = {
      "content-type": "application/json",
      'x-access-token': localStorage.getItem("token")
    }
    let err = this.validate();
    if (!err) {
      if (this.state.nom === "") {
        this.state.nom = this.state.admin.nom;
      }
      if (this.state.prenom === "") {
        this.state.prenom = this.state.admin.prenom;
      }
      if (this.state.email === "") {
        this.state.email = this.state.admin.email;
      }
      if (this.state.username === "") {
        this.state.username = this.state.admin.username;
      }
      if (this.state.password === "") {
        this.state.password = this.state.admin.password;
      }
      else if ((this.state.password != "") && (this.state.password === this.state.confirmedpassword)) {
        const nom = this.state.nom;
        const prenom = this.state.prenom;
        const email = this.state.email;
        const username = this.state.username;
        const password = this.state.password;
        const data = {nom, prenom, password, username, email}
        axios.put("http://127.0.0.1:8000/admin/modifier/" + localStorage.getItem("idAdmin"), data, {headers: headers}).then(res => {
          console.log(res.data)
          // if(res.data === ""){
          //   alert("Vous devez remplissez tous les champs")
          // }
          // else
          // {
          //   window.location.href="/#/home/association";
          // }
          window.location.href = "/home/association";
        })
      }

      else {
        //alert("confirmer votre password");
        this.toggleWarningClose();
      }

    }
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>

          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <small>Modifier Informations</small>
                <strong> Administrateur</strong>

              </CardHeader>
              <CardBody>
                <FormGroup>
                  <Label htmlFor="company">Nom</Label>
                  <Input type="text" id="company" placeholder={this.state.admin.nom}
                         onChange={evt=> this.setState({nom: evt.target.value})}/>
                  {
                    this.state.erreur===false ?
                      <FormText>{this.state.nomErr}</FormText>:null
                  }
                  {
                    this.state.erreur===true ?
                      <FormText id ="colorEr" className="help-block">{this.state.nomErr}</FormText>:null
                  }
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="street">Prenom</Label>
                  <Input type="text" id="street" placeholder={this.state.admin.prenom}
                         onChange={evt=> this.setState({prenom: evt.target.value})}/>
                  {
                    this.state.erreur===false ?
                      <FormText>{this.state.prenomErr}</FormText>:null
                  }
                  {
                    this.state.erreur===true ?
                      <FormText id ="colorEr" className="help-block">{this.state.prenomErr}</FormText>:null
                  }
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="hf-email">Email</Label>
                  <Input type="text" id="hf-email" name="hf-email" placeholder={this.state.admin.email} autoComplete="email"
                         onChange={evt=> this.setState({email: evt.target.value})} />
                  {
                    this.state.erreur===false ?
                      <FormText>{this.state.emailErr}</FormText>:null
                  }
                  {
                    this.state.erreur===true ?
                      <FormText id ="colorEr" className="help-block">{this.state.emailErr}</FormText>:null
                  }
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="username">Username</Label>
                  <Input type="text" id="username" name="username" placeholder={this.state.admin.username}
                         onChange={evt=> this.setState({username: evt.target.value})}/>
                  {
                    this.state.erreur===false ?
                      <FormText>{this.state.usernameErr}</FormText>:null
                  }
                  {
                    this.state.erreur===true ?
                      <FormText id ="colorEr" className="help-block">{this.state.usernameErr}</FormText>:null
                  }
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="hf-password">Mot De Passe</Label>
                  <Input type="password" id="hf-password" name="hf-password" placeholder="Ancien / Nouveau Mot de passe" autoComplete="current-password"
                         onChange={evt=> this.setState({password: evt.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="hf-password2">Confirmer Mot De Passe</Label>
                  <Input type="password" id="hf-password2" name="hf-password2" placeholder="Confirmer votre mot de passe" autoComplete="current-password"
                         onChange={evt=> this.setState({confirmedpassword: evt.target.value})} />
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.handleEdit.bind(this)}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                <Modal isOpen={this.state.warning} toggle={this.toggleWarning}
                       className={'modal-warning ' + this.props.className}>
                  <ModalHeader toggle={this.toggleWarning}>Confirmer Mot de passe</ModalHeader>
                  <ModalBody>
                    Voulez devez confirmer votre mot de passe !
                  </ModalBody>
                  <ModalFooter>
                    <Button color="warning" onClick={this.toggleWarningClose}>OK</Button>{' '}
                  </ModalFooter>
                </Modal>
              </CardFooter>
            </Card>
          </Col>

        </Row>

      </div>
    );
  }
}

export default ModifierAdmin;
