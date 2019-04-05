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

class ModifierBenevole extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      benevole: {
        nom:"",
        prenom:"",
        sexe:"",
        ville:"",
        adresse:"",
        codePostale:"",
        tel:"",
        email:"",
        password:"",
        username:""
      },
      nom:"",
      nomErr:"",
      prenom:"",
      prenomErr:"",
      sexe:"",
      sexeErr:"",
      ville:"",
      villeErr:"",
      adresse:"",
      adresseErr:"",
      codePostale:"",
      codePostaleErr:"",
      tel:"",
      telErr:"",
      email:"",
      emailErr:"",
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
      prenomErr:"",
      sexeErr:"",
      villeErr:"",
      adresseErr:"",
      codePostaleErr:"",
      telErr:"",
      emailErr: ""
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
        errors.nomErr = "Veuillez verifier le Nom du Benevole";
      }
    }

    if(this.state.prenom.length===0){
      isError = false;
    }
    else {
      if ((this.state.prenom.length < 2)||!regexNom.test(this.state.prenom)) {

        isError = true;
        errors.prenomErr = "Veuillez verifier le Prenom du Benevole";
      }
    }

    if(this.state.adresse.length===0){
      isError = false;
    }
    else {
      if ((this.state.adresse.length < 4) || !regexAdresse.test(this.state.adresse)) {

        isError = true;
        errors.adresseErr = "Veuillez verifier l\'Adresse du Benevole";
      }
    }

    if(this.state.ville.length===0){
      isError = false;
    }
    else {
      if ((this.state.ville.length < 3) || !regexNom.test(this.state.ville)) {

        isError = true;
        errors.villeErr = "Veuillez verifier la Ville du Benevole";
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
        errors.telErr = "Veuillez verifier le Numero de Telephone du Benevole";
      }
    }

    if(this.state.email.length===0){
      isError = false;
    }
    else {
      if ((this.state.email.length > 25) || !regexEmail.test(this.state.email)) {

        isError = true;
        errors.emailErr = "Veuillez verifier l\'Email du Benevole";
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

handleChangeGenre(evt){
    console.log("genre ", evt.target.value);
    this.setState({sexe:evt.target.value})
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
    fetch("http://127.0.0.1:8000/benevole/"+localStorage.getItem("idBenevole"), {method: 'GET', headers: headers})
      .then(response => response.json())
      .then(data =>{
        console.log(data);
        this.setState({benevole:data});
      })
  }

  handleEdit() {
    let err = this.validate();
    if (!err) {
      if (this.state.nom === "") {
        this.state.nom = this.state.benevole.nom;
        console.log("state: ", this.state.nom);

      }

      if (this.state.prenom === "") {
        this.state.prenom = this.state.benevole.prenom;
        console.log("state: ", this.state.prenom);

      }

      if (this.state.sexe === "") {
        this.state.sexe = this.state.benevole.sexe;
        console.log("state: ", this.state.sexe);

      }

      if (this.state.ville === "") {
        this.state.ville = this.state.benevole.ville;
        console.log("state: ", this.state.ville);

      }

      if (this.state.adresse === "") {
        this.state.adresse = this.state.benevole.adresse;
        console.log("state: ", this.state.adresse);

      }

      if (this.state.codePostale === "") {
        this.state.codePostale = this.state.benevole.codePostale;
        console.log("state: ", this.state.codePostale);

      }

      if (this.state.tel === "") {
        this.state.tel = this.state.benevole.tel;
        console.log("state: ", this.state.tel);

      }

      if (this.state.email === "") {
        this.state.email = this.state.benevole.email;
        console.log("state: ", this.state.email);

      }


      else if (this.state != "") {
        console.log("state: ", this.state);

        const headers = {
          "content-type": "application/json",
          'x-access-token': localStorage.getItem("token")
        }

        console.log("else")
        axios.put("http://127.0.0.1:8000/benevole/modifier/" + localStorage.getItem("idBenevole"), {
          nom: this.state.nom,
          prenom: this.state.prenom,
          sexe: this.state.sexe,
          ville: this.state.ville,
          adresse: this.state.adresse,
          codePostale: this.state.codePostale,
          tel: this.state.tel,
          email: this.state.email,
          password: this.state.benevole.password,
          username: this.state.benevole.username
        }, {headers: headers}).then(res => {

          console.log("data ", res.data)
          if (res.data === "") {

            //alert("Vous devez remplissez tous les champs")
            this.toggleWarningClose();
          }
          else {
            window.location.href = "/home/benevole";
          }
        })
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
                <strong> Benevole</strong>

              </CardHeader>
              <CardBody>
                <FormGroup>
                  <Label htmlFor="company">Nom Benevole</Label>
                  <Input type="text" id="company" placeholder={this.state.benevole.nom}
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
                  <Input type="text" id="street" placeholder={this.state.benevole.prenom}
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
                {
                  this.state.benevole.sexe ==="Homme" ?
                    <FormGroup row>
                      <Col md="3">
                        <Label>Genre</Label>
                      </Col>
                      <Col md="10">
                        <FormGroup check className="radio">
                          <Input className="form-check-input" type="radio" id="radio1" name="radios" checked value="Homme" onChange={evt=>this.handleChangeGenre(evt)}/>
                          <Label check className="form-check-label" htmlFor="radio1">Homme</Label>
                        </FormGroup>
                        <FormGroup check className="radio">
                          <Input className="form-check-input" type="radio" id="radio2" name="radios" value="Femme"  onChange={evt=>this.handleChangeGenre(evt)}/>
                          <Label check className="form-check-label" htmlFor="radio2">Femme</Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                    :null
                }

                {
                  this.state.benevole.sexe ==="Femme" ?
                    <FormGroup row>
                      <Col md="3">
                        <Label>Genre</Label>
                      </Col>
                      <Col md="10">
                        <FormGroup check className="radio">
                          <Input className="form-check-input" type="radio" id="radio1" name="radios"  value="Homme" onChange={evt=>this.handleChangeGenre(evt)}/>
                          <Label check className="form-check-label" htmlFor="radio1">Homme</Label>
                        </FormGroup>
                        <FormGroup check className="radio">
                          <Input className="form-check-input" type="radio" id="radio2" name="radios" checked value="Femme" checked onChange={evt=>this.handleChangeGenre(evt)}/>
                          <Label check className="form-check-label" htmlFor="radio2">Femme</Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                    :null
                }


                <FormGroup>
                  <Label htmlFor="country">Adresse</Label>
                  <Input type="text" id="country" placeholder={this.state.benevole.adresse}
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
                      <Input type="text" id="city" placeholder={this.state.benevole.ville}
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
                      <Input type="text" id="postal-code" placeholder={this.state.benevole.codePostale}
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
                  <Label htmlFor="username">Telephone</Label>
                  <Input type="text" id="username" name="username" placeholder={this.state.benevole.tel}
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
                  <Label htmlFor="hf-email">Email</Label>
                  <Input type="text" id="hf-email" name="hf-email" placeholder={this.state.benevole.email} autoComplete="email"
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
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.handleEdit.bind(this)}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                <Modal isOpen={this.state.warning} toggle={this.toggleWarning}
                       className={'modal-warning ' + this.props.className}>
                  <ModalHeader toggle={this.toggleWarning}>Erreur de modification</ModalHeader>
                  <ModalBody>
                    Voulez devez au moins modifier une information !
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

export default ModifierBenevole;
