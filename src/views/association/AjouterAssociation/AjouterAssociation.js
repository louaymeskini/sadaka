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

class AjouterAssociation extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      nom:"",
      ville:"",
      adresse:"",
      codePostale:"",
      tel:"",
      email:"",
      username:"",
      password:"",
      collapse: true,
      fadeIn: true,
      timeout: 300,
      file:File
    };
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

    const nom =this.state.nom;
    const ville =this.state.ville;
    const codePostale =this.state.codePostale;
    const adresse =this.state.adresse;
    const tel =this.state.tel;
    const username =this.state.username;
    const password =this.state.password;
    const email =this.state.email;


    if (nom === ""||ville===""||adresse===""||
      codePostale===""||tel===""|| email===""||
      username===""|| password==="")
    {
      alert("no data");
    }
    else
    {
      const headers={
        'x-access-token':localStorage.getItem("token")
      }


      const data={
        nom,adresse,ville,codePostale,tel,email,username,password
      }
      console.log("name ",this.state.file.name);

      const  formData= new FormData();
    formData.append("imageAssociation",this.state.file);
      formData.append("nom",nom);
      formData.append("adresse",adresse);
      formData.append("ville",ville);
      formData.append("codePostale",codePostale);
      formData.append("tel",tel);
      formData.append("email",email);
      formData.append("username",username);
      formData.append("password",password);

      axios.post("http://127.0.0.1:8000/association/ajouter",formData,{headers: headers})
        .then(res=>{
        console.log(res.data)

          window.location.href="/#/home/association";

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
                <strong> Association</strong>
              </CardHeader>

              <CardBody>
                <FormGroup>
                  <Label htmlFor="imgAsso">Logo Association</Label>
                  <Input type="file" id="imgAsso"
                         onChange={this.fileChangeHandler}/>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="company">Nom Association</Label>
                  <Input type="text" id="company" placeholder="Entrer le nom association"
                         value={this.state.nom} onChange={evt=> this.setState({nom: evt.target.value})}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="street">Adresse</Label>
                  <Input type="text" id="street" placeholder="Entrer adresse association"
                         value={this.state.adresse} onChange={evt=> this.setState({adresse: evt.target.value})}/>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="8">
                    <FormGroup>
                      <Label htmlFor="city">Ville</Label>
                      <Input type="text" id="city" placeholder="Entrer ville du association"
                             value={this.state.ville} onChange={evt=> this.setState({ville: evt.target.value})}/>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="postal-code">Code Postale</Label>
                      <Input type="text" id="postal-code" placeholder="Entrer Code Postale"
                             value={this.state.codePostale} onChange={evt=> this.setState({codePostale: evt.target.value})}/>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="country">Telephone</Label>
                  <Input type="text" id="country" placeholder="Entrer Telephone"
                         value={this.state.tel} onChange={evt=> this.setState({tel: evt.target.value})}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="vat">Email Association</Label>
                  <Input type="email" id="hf-email" name="hf-email" placeholder="Entrer Email..." autoComplete="email"
                         value={this.state.email} onChange={evt=> this.setState({email: evt.target.value})}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="username">Username Association</Label>
                  <Input type="text" id="username" name="username" placeholder="Entrer Username..."
                         value={this.state.username} onChange={evt=> this.setState({username: evt.target.value})}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="hf-password">Mot De Passe Association</Label>
                  <Input type="password" id="hf-password" name="hf-password" placeholder="Enter mot de passe..." autoComplete="current-password"
                         value={this.state.password} onChange={evt=> this.setState({password: evt.target.value})} />
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

export default AjouterAssociation;
