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
} from 'reactstrap';

class AjouterAnnonce extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      titre:"",
      sujet:"",
      pieceJointe:"",
      association:"",
      collapse: true,
      fadeIn: true,
      timeout: 300,
      file:File
    };
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

  componentDidMount(){
    console.log("okk did");
  }

  handlesubmit(){

console.log("okkkkkkk");
    console.log("state: ",this.state);
   console.log("token ",localStorage.getItem("token"));
   //console.log("id Association: ", localStorage.getItem("idAssociation"));

    const titre =this.state.titre;
    const sujet =this.state.sujet;
    const pieceJointe =this.state.ville;
    const association =this.state.association;


    if (titre === ""||sujet===""||pieceJointe==="")
    {
      alert("no data");
    }
    else
    {
      const headers={
        'x-access-token':localStorage.getItem("token")
      }

      const association=localStorage.getItem("idAssociation");
      //const  data={titre, sujet, pieceJointe, association}
      const  formData= new FormData();

      formData.append("titre",titre);
      formData.append("sujet",sujet);
      formData.append("pieceJointe",this.state.file);
      formData.append("association",association);

      axios.post("http://127.0.0.1:8000/annonce/ajouter",formData,{headers: headers})
        .then(res=>{
        console.log(res.data)

          window.location.href="/#/home/annonce";

      })
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
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="textarea-input">Sujet</Label>
                  <Input type="textarea" id="textarea-input" name="textarea-input" placeholder="Entrer le sujet de evenement" rows="4"
                         value={this.state.sujet} onChange={evt=> this.setState({sujet: evt.target.value})}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="imgAsso">Piece Jointe</Label>
                  <Input type="file" id="pieceJointe"
                         onChange={this.fileChangeHandler}/>
                </FormGroup>


              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.handlesubmit.bind(this)}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
          </Col>

        </Row>

      </div>
    );
  }
}

export default AjouterAnnonce;
