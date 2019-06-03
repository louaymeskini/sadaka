import React, { Component } from 'react';
import axios from 'axios';
import config from '../../../config/config';
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

class ModifierAssociation2 extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      association: {
        nom:"",
        ville:"",
        adresse:"",
        codePostale:"",
        tel:"",
        email:"",
        username:"",
        password:"",
        imageAssociation:""
      },
      nom:"",
      nomErr:"",
      ville:"",
      villeErr:"",
      adresse:"",
      adresseErr:"",
      codePostale:"",
      codePostale:"",
      tel:"",
      telErr:"",
      email:"",
      emailErr:"",
      username:"",
      usernameErr:"",
      password:"",
      passwordErr:"",
      confirmedpassword:"",
      confirmedpasswordErr:"",
      file:File,
      imageAssociation:"",
      imageAssociationErr:"",
      collapse: true,
      fadeIn: true,
      timeout: 300,
      warning: false
    };
    //this.toggleWarning = this.toggleWarning.bind(this);
  }

  validate = () => {

    let isError = false;

    const errors = {
      nomErr:"",
      villeErr:"",
      adresseErr:"",
      codePostaleErr:"",
      telErr:"",
      emailErr: "",
      usernameErr:"",
      passwordErr: "",
      confirmedpasswordErr:"",
      fileErr: "",
      imageAssociationErr:"",
    }
    //console.log("login ",this.state.login);
    //console.log("pws ",this.state.password);

    const regex1=/^[a-zA-Z0-9._-]+$/;
    const regexAdresse=/^\s*\S+(?:\s+\S+[a-zA-Z0-9])/;
    const regexEmail=/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}/igm;
    const regexNom=/^[a-zA-Z]*$/;
    const regexNum=/[0-9]+/g;
    const regexImg=/[\/.](gif|jpg|jpeg|tiff|png)$/i;

    if(this.state.association.imageAssociation!=""){
      isError = false;
    }
    else {
      if (!regexImg.test(this.state.file['name'])) {
        isError = true;
        errors.fileErr = "Veuillez verifier l\'Image de l'association";
      }
    }

    if(this.state.adresse.length===0){
      isError = false;
    }
    else {
      if ((this.state.adresse.length < 4) || !regexAdresse.test(this.state.adresse)) {

        isError = true;
        errors.adresseErr = "Veuillez verifier l\'Adresse de l\'association";
      }
    }

    if(this.state.ville.length===0){
      isError = false;
    }
    else {
      if ((this.state.ville.length < 3) || !regexNom.test(this.state.ville)) {

        isError = true;
        errors.villeErr = "Veuillez verifier la Ville de l\'association";
      }
    }

    if(this.state.codePostale.length===0){
      isError = false;
    }
    else {
      if ((this.state.codePostale.length > 4) || !regexNum.test(this.state.codePostale)) {

        isError = true;
        errors.codePostaleErr = "Veuillez verifier le Code Postale";
      }
    }

    if(this.state.tel.length===0){
      isError = false;
    }
    else {
      if ((this.state.tel.length > 9) || (this.state.tel.length < 8) || !regexNum.test(this.state.tel)) {

        isError = true;
        errors.telErr = "Veuillez verifier le Numero de Telephone";
      }
    }

    if(this.state.email.length===0){
      isError = false;
    }
    else {
      if ((this.state.email.length > 25) || !regexEmail.test(this.state.email)) {

        isError = true;
        errors.emailErr = "Veuillez verifier l\'Email du l\'association";
      }
    }

    if(this.state.username.length===0){
      isError = false;
    }
    else {
      if ((this.state.username.length < 3) || !regex1.test(this.state.username)) {

        isError = true;
        errors.usernameErr = "Veuillez verifier le Username de l\'association";
      }
    }

    if ((this.state.password != "") && (this.state.password === this.state.confirmedpassword)) {
      isError = false;
    }
    else{
      if ((this.state.password==="")|| (this.state.password != this.state.confirmedpassword) ||(this.state.password.length > 20)||(this.state.password.length < 3)||!regex1.test(this.state.password)) {

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
    console.log("id: ",localStorage.getItem("id"));
    this.getone();
  }

  getone(){
    const headers={
      "content-type":"application/json",
      'x-access-token':localStorage.getItem("token")
    }
    fetch(config.baseUrl+"/association/"+localStorage.getItem("idAssociation"), {method: 'GET', headers: headers})
      .then(response => response.json())
      .then(data =>{
        console.log(data);
        console.log("img" ,data['imageAssociation']);
        this.setState({association:data});
        this.setState({imageAssociation:data['imageAssociation']});
      })
  }

  fileChangedHandler = (event) => {

    const file = event.target.files[0];

    this.state.file = file;

    try{
      this.setState({imageAssociation: file.name});
    }
    catch(Ex){
      this.setState({imageAssociation: this.state.association.imageAssociation});
    }

    console.log("vide",file)

  }

  handleEdit() {
    // console.log("state: ",this.state)
    let err = this.validate();
    if (!err) {
      if (this.state.nom === "") {
        this.state.nom = this.state.association.nom;
      }
      if (this.state.ville === "") {
        this.state.ville = this.state.association.ville;
      }
      if (this.state.adresse === "") {
        this.state.adresse = this.state.association.adresse;
      }
      if (this.state.codePostale === "") {
        this.state.codePostale = this.state.association.codePostale;
      }
      if (this.state.tel === "") {
        this.state.tel = this.state.association.tel;
      }
      if (this.state.email === "") {
        this.state.email = this.state.association.email;
      }
      if (this.state.username === "") {
        this.state.username = this.state.association.username;
      }
      if (this.state.password === "") {
        this.state.password = this.state.association.password;
      }

      else if ((this.state.password != "") && (this.state.password === this.state.confirmedpassword)) {

        const options = {
          method: 'put',

          headers: {
            "Content-type": "application/json",
            'x-access-token': localStorage.getItem("token")
          },


          body: JSON.stringify({

            "nom": "" + this.state.nom + "",
            "adresse": "" + this.state.adresse + "",
            "ville": "" + this.state.ville + "",
            "codePostale": "" + this.state.codePostale + "",
            "email": "" + this.state.email + "",
            "tel": "" + this.state.tel + "",
            "username": "" + this.state.username + "",
            "password": "" + this.state.password + "",
            //   "imageAssociation": "" + this.state.imageAssociation + "",
          })
        }


        fetch(config.baseUrl+"/association/modifier/" + localStorage.getItem("idAssociation"), options)

          .then(response => response.json())

          .then(data => {


            console.log("name ", this.state.file.name);

            const formData = new FormData();

            //formData.append('file', this.state.file)
            formData.append('imageAssociation', this.state.file)


            const config = {

              headers: {
                'x-access-token': localStorage.getItem("token")
              }
            }


            if (this.state.file.name != "File") {

              axios.put(config.baseUrl+"/association/modifier/" + localStorage.getItem("idAssociation") + "/imageassociation", formData, config)

                .then(function (response) {
                  console.log('saved successfully')
                });

            }
            console.log("data", data);
            window.location.href = "/home/benevoles/membre";

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
                <small>Modifier</small>
                <strong> Association</strong>

              </CardHeader>
              <CardBody>
                <FormGroup>
                  <Label htmlFor="imgAsso">Logo Association</Label>
                  <Row>
                  <Col xs="12" sm="3">
                  <img src={config.baseUrl+'/association/img/'+this.state.imageAssociation} width="50" height="50"/>
                  </Col>
                  <Col xs="12" sm="9">

                  <Input type="file" id="imgAsso"
                         onChange={this.fileChangedHandler}/>
                  </Col>
                  </Row>
                  {
                    this.state.erreur===false ?
                      <FormText>{this.state.fileErr}</FormText>:null
                  }
                  {
                    this.state.erreur===true ?
                      <FormText id ="colorEr" className="help-block">{this.state.fileErr}</FormText>:null
                  }
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="disabled-input">Nom Association</Label>
                  <Input type="text" id="disabled-input" name="disabled-input" placeholder={this.state.association.nom} disabled/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="street">Adresse</Label>
                  <Input type="text" id="street" placeholder={this.state.association.adresse}
                         onChange={evt=> this.setState({adresse: evt.target.value})}/>
                  {
                    this.state.erreur===false ?
                      <FormText>{this.state.adresseErr}</FormText>:null
                  }
                  {
                    this.state.erreur===true ?
                      <FormText id ="colorEr" className="help-block">{this.state.adresseErr}</FormText>:null
                  }
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="8">
                    <FormGroup>
                      <Label htmlFor="city">Ville</Label>
                      <Input type="text" id="city" placeholder={this.state.association.ville}
                             onChange={evt=> this.setState({ville: evt.target.value})}/>
                      {
                        this.state.erreur===false ?
                          <FormText>{this.state.villeErr}</FormText>:null
                      }
                      {
                        this.state.erreur===true ?
                          <FormText id ="colorEr" className="help-block">{this.state.villeErr}</FormText>:null
                      }
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="postal-code">Code Postale</Label>
                      <Input type="text" id="postal-code" placeholder={this.state.association.codePostale}
                             onChange={evt=> this.setState({codePostale: evt.target.value})}/>
                      {
                        this.state.erreur===false ?
                          <FormText>{this.state.codePostaleErr}</FormText>:null
                      }
                      {
                        this.state.erreur===true ?
                          <FormText id ="colorEr" className="help-block">{this.state.codePostaleErr}</FormText>:null
                      }
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="country">Telephone</Label>
                  <Input type="text" id="country" placeholder={this.state.association.tel}
                         onChange={evt=> this.setState({tel: evt.target.value})}/>
                  {
                    this.state.erreur===false ?
                      <FormText>{this.state.telErr}</FormText>:null
                  }
                  {
                    this.state.erreur===true ?
                      <FormText id ="colorEr" className="help-block">{this.state.telErr}</FormText>:null
                  }
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="hf-email">Email Association</Label>
                  <Input type="email" id="hf-email" name="hf-email" placeholder={this.state.association.email} autoComplete="email"
                         onChange={evt=> this.setState({email: evt.target.value})}/>
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
                  <Label htmlFor="username">Username Association</Label>
                  <Input type="text" id="username" name="username" placeholder={this.state.association.username}
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
                  <Label htmlFor="hf-password">Mot De Passe Association</Label>
                  <Input type="password" id="hf-password" name="hf-password" placeholder="Ancien / Nouveau Mot de passe" autoComplete="current-password"
                         onChange={evt=> this.setState({password: evt.target.value})} />
                  {
                    this.state.erreur===false ?
                      <FormText>{this.state.passwordErr}</FormText>:null
                  }
                  {
                    this.state.erreur===true ?
                      <FormText id ="colorEr" className="help-block">{this.state.passwordErr}</FormText>:null
                  }
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="hf-password2">Confirmed Mot De Passe</Label>
                  <Input type="password" id="hf-password2" name="hf-password2" placeholder="Confirmer votre mot de passe" autoComplete="current-password"
                         onChange={evt=> this.setState({confirmedpassword: evt.target.value})} />
                  {
                    this.state.erreur===false ?
                      <FormText>{this.state.passwordErr}</FormText>:null
                  }
                  {
                    this.state.erreur===true ?
                      <FormText id ="colorEr" className="help-block">{this.state.passwordErr}</FormText>:null
                  }
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button type="submit" color="primary" onClick={this.handleEdit.bind(this)}><i className="fa fa-dot-circle-o"></i> Modifier</Button>
                <Button type="reset" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                <Modal isOpen={this.state.warning} toggle={this.toggleWarning}
                       className={'modal-warning ' + this.props.className}>
                  <ModalHeader toggle={this.toggleWarning}>Erreur de modification</ModalHeader>
                  <ModalBody>
                    Vous devez confirmer le mot de passe !
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

export default ModifierAssociation2;
