import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

class benevole extends Component {

  constructor(){
    super();
    this.state={
      benevoles:[]
    }
  }

  componentDidMount(){
    this.getAll();
  }

  getAll(){
    console.log("token ",localStorage.getItem("token"));
    const headers={
      "content-type":"application/json",
      'x-access-token':localStorage.getItem("token")
    }
    fetch("http://localhost:8000/benevole/all", {method: 'GET',headers:headers })
      .then(response => response.json())
      .then(data =>{
        console.log(data);
        this.setState({benevoles:data})
      })
  }

  remove(e,id){
    e.preventDefault();
    console.log("id: ",id);
    const headers={
      "content-type":"application/json",
      "x-access-token":localStorage.getItem("token")
    }
    fetch("http://127.0.0.1:8000/benevole/supprimer/"+id, {method: 'DELETE', headers:headers})
      .then(response => response.json())
      .then(data =>{
        console.log(data);
        if (data['state']==="non"){
          alert("benevole n est pas supprime");
        }
        else{
          alert("suppression effectue");
          this.getAll();
        }
      })
  }

  modif(e,id){
    e.preventDefault();
    console.log("id: ",id);
    localStorage.setItem("id",id);
    window.location.href="/#/home/benevole/modifier";
  }

  render() {
    return (
      <div className="animated fadeIn">


        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Liste des Benevoles
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Nom Benevole</th>
                    <th>Prenom</th>
                    <th>Sexe</th>
                    <th>Ville</th>
                    <th>Adresse</th>
                    <th>Code Postale</th>
                    <th>Telephone</th>
                    <th>Email</th>
                    <th scope="col">Modifier</th>
                    <th scope="col">Supprimer</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.benevoles.map((item)=>
                  <tr>
                    <td>{item.nom}</td>
                    <td>{item.prenom}</td>
                    <td>{item.sexe}</td>
                    <td>{item.ville}</td>
                    <td>{item.adresse}</td>
                    <td>{item.codePostale}</td>
                    <td>{item.tel}</td>
                    <td>{item.email}</td>
                    <td><i className="fa fa-edit" onClick={e=>this.modif(e,item._id)}></i></td>
                    <td><i className="fa fa-remove" onClick={e=>this.remove(e,item._id)}></i></td>

                  </tr>
                    )}
                  </tbody>
                </Table>
                <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default benevole;
