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
        email:""
      },
      nom:"",
      prenom:"",
      sexe:"",
      ville:"",
      adresse:"",
      codePostale:"",
      tel:"",
      email:"",
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
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
    fetch("http://127.0.0.1:8000/benevole/"+localStorage.getItem("id"), {method: 'GET', headers: headers})
      .then(response => response.json())
      .then(data =>{
        console.log(data);
        this.setState({benevole:data});
      })
  }

  handleEdit(){
    console.log("state: ",this.state)
    const headers={
      "content-type":"application/json",
      'x-access-token':localStorage.getItem("token")
    }
    if (this.state.nom === "")
    {
      this.state.nom=this.state.association.nom;
    }
    if (this.state.prenom === "")
    {
      this.state.prenom=this.state.association.prenom;
    }
    if (this.state.sexe === "")
    {
      this.state.sexe=this.state.association.sexe;
    }
    if (this.state.ville === "")
    {
      this.state.ville=this.state.association.ville;
    }
    if (this.state.adresse === "")
    {
      this.state.adresse=this.state.association.adresse;
    }
    if (this.state.codePostale === "")
    {
      this.state.codePostale=this.state.association.codePostale;
    }
    if (this.state.tel === "")
    {
      this.state.tel=this.state.association.tel;
    }
    if (this.state.email === "")
    {
      this.state.email=this.state.association.email;
    }
    else
    {
      axios.put("http://127.0.0.1:8000/benevole/modifier/"+localStorage.getItem("id"), {

        nom:this.state.nom,
        prenom:this.state.prenom,
        sexe:this.state.sexe,
        ville:this.state.ville,
        adresse:this.state.adresse,
        codePostale:this.state.codePostale,
        tel:this.state.tel,
        email:this.state.email
      },{headers: headers}).then(res=>{
        console.log(res.data)
        if(res.data === ""){
          alert("Vous devez remplissez tous les champs")
        }
        else
        {
          window.location.href="/#/home/benevole";
        }
      })
    }
    this.setState({nom:""})
    this.setState({prenom:""})
    this.setState({sexe:""})
    this.setState({ville:""})
    this.setState({adresse:""})
    this.setState({codePostale:""})
    this.setState({tel:""})
    this.setState({email:""})

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
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="street">Prenom</Label>
                  <Input type="text" id="street" placeholder={this.state.benevole.prenom}
                         onChange={evt=> this.setState({prenom: evt.target.value})}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="select">Sexe</Label>

                    <Input type="select" name="select" id="select">
                      <option value="0">Homme</option>
                      <option value="1">Femme</option>
                    </Input>

                </FormGroup>
                <FormGroup>
                  <Label htmlFor="country">Adresse</Label>
                  <Input type="text" id="country" placeholder={this.state.benevole.adresse}
                         onChange={evt=> this.setState({adresse: evt.target.value})}/>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="8">
                    <FormGroup>
                      <Label htmlFor="city">Ville</Label>
                      <Input type="text" id="city" placeholder={this.state.benevole.ville}
                             onChange={evt=> this.setState({ville: evt.target.value})}/>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="postal-code">Code Postale</Label>
                      <Input type="text" id="postal-code" placeholder={this.state.benevole.codePostale}
                             onChange={evt=> this.setState({codePostale: evt.target.value})}/>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="username">Telephone</Label>
                  <Input type="text" id="username" name="username" placeholder={this.state.benevole.tel}
                         onChange={evt=> this.setState({tel: evt.target.value})}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="hf-email">Email</Label>
                  <Input type="text" id="hf-email" name="hf-email" placeholder={this.state.benevole.email} autoComplete="email"
                         onChange={evt=> this.setState({email: evt.target.value})} />
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.handleEdit.bind(this)}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
          </Col>

        </Row>

      </div>
    );
  }
}

export default ModifierBenevole;
