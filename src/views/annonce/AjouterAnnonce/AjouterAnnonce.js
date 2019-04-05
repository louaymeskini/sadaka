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

class AjouterAnnonce extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      titre:"",
      titreErr:"",
      sujet:"",
      sujetErr:"",
      pieceJointe:"",
      pieceJointeErr:"",
      association:"",
      currentId:"",
      collapse: true,
      fadeIn: true,
      timeout: 300,
      file:File,
      fileErr:"",
      warning: false
    };
    //this.toggleWarning = this.toggleWarning.bind(this);
  }

  validate = () => {

    let isError = false;

    const errors = {
      titreErr:"",
      sujetErr:"",
      pieceJointeErr:"",
      fileErr:""
    }
    //console.log("login ",this.state.login);
    //console.log("pws ",this.state.password);

    const regex1=/^[a-zA-Z0-9._-]+$/;
    const regexAdresse=/^\s*\S+(?:\s+\S+[a-zA-Z0-9])/;
    const regexEmail=/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}/igm;
    const regexNom=/^[a-zA-Z]*$/;
    const regexNum=/[0-9]+/g;
    const regexFile=/[^\\]*\.(\w+)$/

    if ((this.state.titre==="")||(this.state.titre.length < 2)||!regexAdresse.test(this.state.titre)) {

      isError = true;
      errors.titreErr = "Veuillez verifier le Titre de l\'Annonce";
    }

    if ((this.state.sujet==="")||(this.state.sujet.length < 4)||!regexAdresse.test(this.state.sujet)) {

      isError = true;
      errors.sujetErr = "Veuillez verifier le Sujet de l\'Annonce";
    }

    if(!regexFile.test(this.state.file['name'])){
      isError = true;
      errors.fileErr = "Veuillez verifier la piece jointe de l\'Annonce";
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

  componentDidMount(){
    console.log("okk did");
    console.log("id Association: ", localStorage.getItem("idAssociation"));
  }

  fileChangeHandler =(e)=>{
    const file=e.target.files[0];
    console.log("file ",file);

    this.setState({file:file});
  }

  toggleWarningClose =()=> {
    this.setState({
      warning: !this.state.warning,
    });
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
      const pieceJointe = this.state.ville;
      const association = this.state.association;


      if (titre === "" || sujet === "" || pieceJointe === "") {
        //alert("no data");
        this.toggleWarningClose();
      }
      else {
        const headers = {
          'x-access-token': localStorage.getItem("token")
        }

        const association = localStorage.getItem("idAssociation");
        //const  data={titre, sujet, pieceJointe, association}
        const formData = new FormData();

        formData.append("titre", titre);
        formData.append("sujet", sujet);
        formData.append("pieceJointe", this.state.file);
        formData.append("association", association);

        axios.post("http://127.0.0.1:8000/annonce/ajouter", formData, {headers: headers})
          .then(res => {
            console.log(res.data)
            fetch("http://127.0.0.1:8000/association/ajouter/" + localStorage.getItem("idAssociation") + "/annonce/" + res.data._id, {
              method: 'PUT',
              headers: headers
            })
              .then(response => response.json())
              .then(data => {
                console.log("pushed = true", data);
              })
            //this.setState({currentId:res.data._id});
            //console.log("current id: ",res.data._id)
            window.location.href = "/home/annonce";
          })

        //var currentId = res.data._id;
        //console.log("current id: ", this.state.currentId)
        //fetch("http://127.0.0.1:8000/association/ajouter/"+localStorage.getItem("idAssociation")+"/annonce/"+id, {method: 'PUT', headers:headers})
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
                <small>Ajouter</small>
                <strong> Annonce</strong>
              </CardHeader>

              <CardBody>

                <FormGroup>
                  <Label htmlFor="company">Titre Annonce</Label>
                  <Input type="text" id="company" placeholder="Entrer le titre de l'annonce"
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
                  <Label htmlFor="imgAsso">Piece Jointe</Label>
                  <Input type="file" id="pieceJointe"
                         onChange={this.fileChangeHandler}/>
                  {
                    this.state.erreur===false ?
                      <FormText>{this.state.fileErr}</FormText>:null
                  }
                  {
                    this.state.erreur===true ?
                      <FormText id ="colorEr" className="help-block">{this.state.fileErr}</FormText>:null
                  }
                </FormGroup>


              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.handlesubmit.bind(this)}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
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

export default AjouterAnnonce;
