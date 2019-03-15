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

class ModifierAssociation extends Component {

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
      ville:"",
      adresse:"",
      codePostale:"",
      tel:"",
      email:"",
      username:"",
      password:"",
      file:File,
      imageAssociation:"",
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
    fetch("http://127.0.0.1:8000/association/"+localStorage.getItem("id"), {method: 'GET', headers: headers})
      .then(response => response.json())
      .then(data =>{
        console.log(data);
        console.log("img" ,data['imageAssociation']);
        this.setState({association:data});
        this.setState({imageAssociation:data['imageAssociation']});
      })
  }

  fileChangeHandler =(e)=>{
    const file=e.target.files[0];
    console.log("file ",file);
try {
  this.setState({file:file})
  this.setState({imageAssociation: file.name});
}catch (Ex) {
  this.setState({imageAssociation: this.state.association.imageAssociation});
}
  }

  handleEdit(){
   // console.log("state: ",this.state)
    const headers={
      "content-type":"application/json",
      'x-access-token':localStorage.getItem("token")
    }
    if (this.state.nom === "")
    {
      this.state.nom=this.state.association.nom;
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
    if (this.state.username === "")
    {
      this.state.username=this.state.association.username;
    }
    if (this.state.password === "")
    {
      this.state.password=this.state.association.password;
    }
    else
    {
      const headers={
        'x-access-token':localStorage.getItem("token")
      }


      const nom =this.state.nom;
      const ville =this.state.ville;
      const codePostale =this.state.codePostale;
      const adresse =this.state.adresse;
      const tel =this.state.tel;
      const username =this.state.username;
      const password =this.state.password;
      const email =this.state.email;


      const  formData= new FormData();
if (this.state.file != File){
  formData.append("imageAssociation",this.state.file);

}
else {
  formData.append("imageAssociation", this.state.imageAssociation);
}
      formData.append("nom",nom);
      formData.append("adresse",adresse);
      formData.append("ville",ville);
      formData.append("codePostale",codePostale);
      formData.append("tel",tel);
      formData.append("email",email);
      formData.append("username",username);
      formData.append("password",password);

      axios.put("http://127.0.0.1:8000/association/modifier/"+localStorage.getItem("id"),formData,{headers: headers}).then(res=>{
        console.log(res.data)
        if(res.data === ""){
          alert("password or email are incorrect")
        }
        else
        {
          alert("okkkkkkk")
          window.location.href="/#/home/association";
        }
      })
    }
    /*this.setState({nom:""})
    this.setState({ville:""})
    this.setState({codePostale:""})
    this.setState({adresse:""})
    this.setState({tel:""})
    this.setState({email:""})
    this.setState({username:""})
    this.setState({password:""})*/

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
                  <img src={'http://127.0.0.1:8000/association/img/'+this.state.imageAssociation} width="50" height="50"/>
                  </Col>
                  <Col xs="12" sm="9">

                  <Input type="file" id="imgAsso"
                         onChange={this.fileChangeHandler}/>
                  </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="company">Nom Association</Label>
                  <Input type="text" id="company" placeholder={this.state.association.nom}
                         onChange={evt=> this.setState({nom: evt.target.value})}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="street">Adresse</Label>
                  <Input type="text" id="street" placeholder={this.state.association.adresse}
                         onChange={evt=> this.setState({adresse: evt.target.value})}/>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="8">
                    <FormGroup>
                      <Label htmlFor="city">Ville</Label>
                      <Input type="text" id="city" placeholder={this.state.association.ville}
                             onChange={evt=> this.setState({ville: evt.target.value})}/>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="postal-code">Code Postale</Label>
                      <Input type="text" id="postal-code" placeholder={this.state.association.codePostale}
                             onChange={evt=> this.setState({codePostale: evt.target.value})}/>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="country">Telephone</Label>
                  <Input type="text" id="country" placeholder={this.state.association.tel}
                         onChange={evt=> this.setState({tel: evt.target.value})}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="hf-email">Email Association</Label>
                  <Input type="email" id="hf-email" name="hf-email" placeholder={this.state.association.email} autoComplete="email"
                         onChange={evt=> this.setState({email: evt.target.value})}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="username">Username Association</Label>
                  <Input type="text" id="username" name="username" placeholder={this.state.association.username}
                         onChange={evt=> this.setState({username: evt.target.value})}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="hf-password">Mot De Passe Association</Label>
                  <Input type="password" id="hf-password" name="hf-password" placeholder={this.state.association.password} autoComplete="current-password"
                         onChange={evt=> this.setState({password: evt.target.value})} />
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

export default ModifierAssociation;
