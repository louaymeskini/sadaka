import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

class annonce extends Component {

  constructor(){
    super();
    this.state={
      annonces:[]
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
    fetch("http://localhost:8000/annonce/all", {method: 'GET',headers:headers })
      .then(response => response.json())
      .then(data =>{
        console.log(data);
        this.setState({annonces:data})
      })
  }

  remove(e,id){
    e.preventDefault();
    console.log("id: ",id);
    const headers={
      "content-type":"application/json",
      "x-access-token":localStorage.getItem("token")
    }
    fetch("http://127.0.0.1:8000/annonce/supprimer/"+id, {method: 'DELETE', headers:headers})
      .then(response => response.json())
      .then(data =>{
        console.log(data);
        if (data['state']==="non"){
          alert("annonce n est pas supprime");
        }
        else{
          alert("suppression effectue");
          this.getAll();
        }
      })
  }

  /*modif(e,id){
    e.preventDefault();
    console.log("id: ",id);
    localStorage.setItem("id",id);
    window.location.href="/#/home/annonce/modifier";
  }*/

  render() {
    return (
      <div className="animated fadeIn">


        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Liste des annonces
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Titre Annonce</th>
                    <th>Sujet</th>
                    <th>Piece Jointe</th>
                    <th scope="col">Remove</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.annonces.map((item)=>
                  <tr key={item.id}>
                    <td>{item.titre}</td>
                    <td>{item.sujet}</td>
                    <td><a href={'http://127.0.0.1:8000/annonce/fichier/'+item.pieceJointe}>{item.pieceJointe}</a></td>
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

export default annonce;
