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

class AjouterEvenement extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      titre:"",
      titreErr:"",
      sujet:"",
      sujetErr:"",
      ville:"",
      villeErr:"",
      adresse:"",
      adresseErr:"",
      date:"",
      dateErr:"",
      association:"",
      collapse: true,
      fadeIn: true,
      timeout: 300,
      file:File,
      warning: false
    };
    //this.toggleWarning = this.toggleWarning.bind(this);
  }

  validate = () => {

    let isError = false;

    const errors = {
      titreErr:"",
      sujetErr:"",
      villeErr:"",
      adresseErr:"",
      dateErr:""
    }
    //console.log("login ",this.state.login);
    //console.log("pws ",this.state.password);

    const regex1=/^[a-zA-Z0-9._-]+$/;
    const regexAdresse=/^\s*\S+(?:\s+\S+[a-zA-Z0-9])/;
    const regexEmail=/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}/igm;
    const regexNom=/^[a-zA-Z]*$/;
    const regexNum=/[0-9]+/g;
    const regexImg=/[\/.](gif|jpg|jpeg|tiff|png)$/i;

    if ((this.state.titre==="")||(this.state.titre.length < 2)) {

      isError = true;
      errors.titreErr = "Veuillez verifier le Titre de l\'evenement";
    }

    if ((this.state.sujet==="")||(this.state.sujet.length < 4)||!regexAdresse.test(this.state.sujet)) {

      isError = true;
      errors.sujetErr = "Veuillez verifier le Sujet de l\'evenement";
    }

    if ((this.state.ville==="")||(this.state.ville.length < 3)||!regexNom.test(this.state.ville)) {

      isError = true;
      errors.villeErr = "Veuillez verifier la Ville de l\'evenement";
    }

    if ((this.state.adresse==="")||(this.state.adresse.length < 4)||!regexAdresse.test(this.state.adresse)) {

      isError = true;
      errors.adresseErr = "Veuillez verifier l\'Adresse de l\'evenement";
    }

    if (this.state.date==="") {

      isError = true;
      errors.dateErr = "Veuillez verifier la Date de l\'evenement";
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
    console.log("okk did");
    console.log("id Association: ", localStorage.getItem("idAssociation"));
  }

  handlesubmit() {

    console.log("okkkkkkk");
    console.log("state: ", this.state);
    console.log("token ", localStorage.getItem("token"));
    //console.log("id Association: ", localStorage.getItem("idAssociation"));

    let err = this.validate();
    if (!err) {
      const titre = this.state.titre;
      const sujet = this.state.sujet;
      const ville = this.state.ville;
      const adresse = this.state.adresse;
      const date = this.state.date;
      const association = this.state.association;


      if (titre === "" || sujet === "" || ville === "" ||
        adresse === "" || date === "") {
        //alert("no data");
        this.toggleWarningClose();
      }
      else {
        const headers = {
          'x-access-token': localStorage.getItem("token")
        }

        const association = localStorage.getItem("idAssociation");
        const data = {titre, sujet, ville, adresse, date, association}

        axios.post(config.baseUrl+"/evenement/ajouter", data, {headers: headers})
          .then(res => {
            console.log(res.data)
            fetch(config.baseUrl+"/association/ajouter/" + localStorage.getItem("idAssociation") + "/evenement/" + res.data._id, {
              method: 'PUT',
              headers: headers
            })
              .then(response => response.json())
              .then(data => {
                console.log("pushed = true", data);
              })

            window.location.href = "/home/evenement";

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

  resetForm(){
    this.setState({
      ...this.state,
      titre: "",
      sujet: "",
      ville: "",
      adresse: "",
      tel: "",
      date: ""
    });
    // this.setState({file:[]});
    // console.log("file", this.state.file);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>

          <Col xs="12" sm="12">
            <Card>

              <CardHeader>
                <small>Ajouter</small>
                <strong> Evenement</strong>
              </CardHeader>

              <CardBody>

                <FormGroup>
                  <Label htmlFor="company">Titre Evenement</Label>
                  <Input type="text" id="company" placeholder="Entrer le titre de evenement"
                         value={this.state.titre} onChange={evt=> this.setState({titre: evt.target.value})}/>
                  {
                    this.state.erreur===false ?
                      <FormText>{this.state.titreErr}</FormText>:null
                  }
                  {
                    this.state.erreur===true ?
                      <FormText id ="colorEr" className="help-block">{this.state.titreErr}</FormText>:null
                  }
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="textarea-input">Sujet</Label>
                  <Input type="textarea" id="textarea-input" name="textarea-input" placeholder="Entrer le sujet de evenement" rows="4"
                         value={this.state.sujet} onChange={evt=> this.setState({sujet: evt.target.value})}/>
                  {
                    this.state.erreur===false ?
                      <FormText>{this.state.sujetErr}</FormText>:null
                  }
                  {
                    this.state.erreur===true ?
                      <FormText id ="colorEr" className="help-block">{this.state.sujetErr}</FormText>:null
                  }
                </FormGroup>


                    <FormGroup>
                      <Label htmlFor="city">Ville</Label>
                      <Input type="text" id="city" placeholder="Entrer ville du evenement"
                             value={this.state.ville} onChange={evt=> this.setState({ville: evt.target.value})}/>
                      {
                        this.state.erreur===false ?
                          <FormText>{this.state.villeErr}</FormText>:null
                      }
                      {
                        this.state.erreur===true ?
                          <FormText id ="colorEr" className="help-block">{this.state.villeErr}</FormText>:null
                      }
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="street">Adresse</Label>
                      <Input type="text" id="street" placeholder="Entrer adresse evenement"
                             value={this.state.adresse} onChange={evt=> this.setState({adresse: evt.target.value})}/>
                      {
                        this.state.erreur===false ?
                          <FormText>{this.state.adresseErr}</FormText>:null
                      }
                      {
                        this.state.erreur===true ?
                          <FormText id ="colorEr" className="help-block">{this.state.adresseErr}</FormText>:null
                      }
                    </FormGroup>


                <FormGroup>
                  <Label htmlFor="date-input">Date Evenement</Label>
                  <Input type="date" id="date-input" name="date-input" placeholder="date"
                         value={this.state.date} onChange={evt=> this.setState({date: evt.target.value})}/>
                  {
                    this.state.erreur===false ?
                      <FormText>{this.state.dateErr}</FormText>:null
                  }
                  {
                    this.state.erreur===true ?
                      <FormText id ="colorEr" className="help-block">{this.state.dateErr}</FormText>:null
                  }
                </FormGroup>

              </CardBody>
              <CardFooter>
                <Button type="submit" color="primary" onClick={this.handlesubmit.bind(this)}><i className="fa fa-dot-circle-o"></i> Ajouter</Button>
                <Button type="reset" color="danger" onClick={this.resetForm.bind(this)}><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
              <Modal isOpen={this.state.warning} toggle={this.toggleWarning}
                     className={'modal-warning ' + this.props.className}>
                <ModalHeader toggle={this.toggleWarning}>Erreur D'ajout</ModalHeader>
                <ModalBody>
                  Vous devez remplire tous les champs !
                </ModalBody>
                <ModalFooter>
                  <Button color="warning" onClick={this.toggleWarningClose}>OK</Button>{' '}
                </ModalFooter>
              </Modal>
            </Card>
          </Col>

        </Row>

      </div>
    );
  }
}

export default AjouterEvenement;
