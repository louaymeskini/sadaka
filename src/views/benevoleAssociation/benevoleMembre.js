import React, {Component} from 'react';
import config from '../../config/config':
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button
} from 'reactstrap';

let prev = 0;
let next = 0;
let last = 0;
let first = 0;

class benevoleMembre extends Component {

  constructor() {
    super();
    this.state = {
      benevoles: [],
      benevoles1: [],
      currentPage: 1,
      todosPerPage: 5,
      warning: false,
      id: "",
      nom: "",
      Accepter: [],
      Accepter1: [],
      idConfirme:[],
      idNonConfirme:[]
    }
    this.handleClick = this.handleClick.bind(this);

    this.handleLastClick = this.handleLastClick.bind(this);

    this.handleFirstClick = this.handleFirstClick.bind(this);
    this.toggleWarning = this.toggleWarning.bind(this);
  }

  handleClick(event) {

    event.preventDefault();

    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  handleLastClick(event) {

    event.preventDefault();

    this.setState({
      currentPage: last
    });
  }

  handleFirstClick(event) {

    event.preventDefault();

    this.setState({
      currentPage: 1
    });
  }

  toggleWarning(e, id, nom) {
    e.preventDefault();
    console.log("id ", id);
    this.setState({
      warning: !this.state.warning,
    });
    this.setState({id: id})
    this.setState({nom: nom})
  }

  toggleWarningClose = () => {
    this.setState({
      warning: !this.state.warning,
    });
  }

  componentDidMount() {
    this.getOneAssociation();
  }

  getOneAssociation() {
    let accept=[];
    console.log("id ass ", localStorage.getItem("idAssociation"));
    const headers = {
      "content-type": "application/json",
      'x-access-token': localStorage.getItem("token")
    }
    fetch(config.baseUrl+"/benevole/trouver/association/" + localStorage.getItem("idAssociation"), {
      method: 'GET',
      headers: headers
    })
      .then(response => response.json())
      .then(data => {
        console.log("association: ", data);
        console.log("id bene: ", data[0]);
        fetch(config.baseUrl+"/association/" + localStorage.getItem("idAssociation"), {
          method: 'GET',
          headers: headers
        })
          .then(response => response.json())
          .then(data1 => {
            console.log("beneveoleAss ", data1);
            if (data1['benevoles'].length === 0) {
              accept.push("0")

            }
            else {
              var found;
              for (var k = 0; k < data.length; k++) {
                found = false;
                for (var j = 0; j < data1['benevoles'].length; j++)
                  if (data[k]['_id'] === (data1['benevoles'][j]['_id'])) {
                    accept.push("1");
                    found = true;
                  }
                if (!found) {
                  accept.push("0");
                }

              }
            }

            console.log("accepter ", accept)
            this.setState({Accepter1: accept})

          })
        console.log(this.state.benevoles1)
        this.setState({benevoles1: data});

      })
  }

  removeAncien = (e) => {
    e.preventDefault();
    //console.log("id: ",id);
    const headers = {
      "content-type": "application/json",
      "x-access-token": localStorage.getItem("token")
    }
    fetch(config.baseUrl+"/association/supprimer/" + localStorage.getItem("idAssociation") + "/benevole/" + this.state.id, {
      method: 'PUT',
      headers: headers
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data['state'] === "non") {
          alert("Benevole membre n est pas supprime");
        }
        else {
          //alert("suppression effectue");
          this.getOneAssociation();
          this.toggleWarningClose();
          //   window.location.reload();
        }
      })
  }

  remove = (e) => {
    e.preventDefault();
    //console.log("id: ",id);
    const headers = {
      "content-type": "application/json",
      "x-access-token": localStorage.getItem("token")
    }
    fetch(config.baseUrl+"/association/supprimer/"+localStorage.getItem("idAssociation") + "/benevole/" + this.state.id, {
      method: 'PUT',
      headers: headers
    })
      .then(response => response.json())
      .then(data1 => {
        console.log(data1);
        fetch(config.baseUrl+"/benevole/supprimer/"+this.state.id +"/association/"+localStorage.getItem("idAssociation"), {
          method: 'PUT',
          headers: headers
        })
          .then(response => response.json())
          .then(data => {
        if (data['state'] === "non") {
          alert("Benevole membre n est pas supprime");
        }
        else {
          //alert("suppression effectue");
          this.getOneAssociation();
          this.toggleWarningClose();
          //   window.location.reload();
        }
          })
      })
  }

  accepter(e, id) {
    e.preventDefault();
    const headers = {
      "content-type": "application/json",
      'x-access-token': localStorage.getItem("token")
    }
    fetch(config.baseUrl+"/association/ajouter/" + localStorage.getItem("idAssociation") + "/benevole/" + id, {
      method: 'PUT',
      headers: headers
    })
      .then(response => response.json())
      .then(data => {
        console.log("benevoles : ", data);
        this.setState({Accepter:""});
        this.setState({Accepter1:""});
        //this.getOneAssociation()
       window.location.reload();
      })
  }

  render() {

    let {benevoles1, currentPage, todosPerPage} = this.state;


    // Logic for displaying current todos

    let indexOfLastTodo = currentPage * todosPerPage;

    let indexOfFirstTodo = indexOfLastTodo - todosPerPage;

    let currentTodos = benevoles1.slice(indexOfFirstTodo, indexOfLastTodo);


    prev = currentPage > 0 ? (currentPage - 1) : 0;

    last = Math.ceil(benevoles1.length / todosPerPage);

    next = (last === currentPage) ? currentPage : currentPage + 1;


    // Logic for displaying page numbers

    let pageNumbers = [];

    for (let i = 1; i <= last; i++) {
      pageNumbers.push(i);
    }
    console.log("inex " ,this.state.Accepter1[0]);
    return (
      <div className="animated fadeIn">


        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Liste des Benevoles Membres
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
                    <th>Accepter</th>
                    <th scope="col">Supprimer</th>
                  </tr>
                  </thead>
                  <tbody>
                  {

                    currentTodos.map((item, index) => {

                      return (

                        <tr key={index}>
                          <td>{item.nom}</td>
                          <td>{item.prenom}</td>
                          <td>{item.sexe}</td>
                          <td>{item.ville}</td>
                          <td>{item.adresse}</td>
                          <td>{item.codePostale}</td>
                          <td>{item.tel}</td>
                          <td>{item.email}</td>
                          {
                            this.state.Accepter1[index]==="0"?
                            <td>
                              <button><i className="fa fa-calendar-check-o fa"
                                         onClick={e => this.accepter(e, item._id)}></i></button>
                            </td>:null
                          }

                          {
                            this.state.Accepter1[index]==="1"?
                            <td>
                              <button disabled> <i className="fa fa-calendar-check-o fa"></i></button>
                            </td>:null
                          }

                          <td><i className="fa fa-remove" onClick={e => this.toggleWarning(e, item._id, item.nom)}></i>
                          </td>


                        </tr>
                      );

                    })

                  }
                  </tbody>
                </Table>

                <Modal isOpen={this.state.warning} toggle={this.toggleWarning}
                       className={'modal-warning ' + this.props.className}>
                  <ModalHeader toggle={this.toggleWarning}>Suppression Benevole Membre</ModalHeader>
                  <ModalBody>
                    Voulez-vous vraiment exclure <b>{this.state.nom} </b> du l'association!
                  </ModalBody>
                  <ModalFooter>
                    <Button color="warning" onClick={this.remove}>Supprimer</Button>{' '}
                    <Button color="secondary" onClick={this.toggleWarningClose}>Annuler</Button>
                  </ModalFooter>
                </Modal>

                <nav>
                  <Pagination>

                    <PaginationItem>
                      {prev === 0 ? <PaginationLink disabled>First</PaginationLink> :
                        <PaginationLink onClick={this.handleFirstClick} id={prev} href={prev}>First</PaginationLink>
                      }
                    </PaginationItem>
                    <PaginationItem>
                      {prev === 0 ? <PaginationLink disabled>Prev</PaginationLink> :
                        <PaginationLink onClick={this.handleClick} id={prev} href={prev}>Prev</PaginationLink>
                      }
                    </PaginationItem>
                    {
                      pageNumbers.map((number, i) =>
                        <Pagination key={i}>
                          <PaginationItem active={pageNumbers[currentPage - 1] === (number) ? true : false}>
                            <PaginationLink onClick={this.handleClick} href={number} key={number} id={number}>
                              {number}
                            </PaginationLink>
                          </PaginationItem>
                        </Pagination>
                      )}

                    <PaginationItem>
                      {
                        currentPage === last ? <PaginationLink disabled>Next</PaginationLink> :
                          <PaginationLink onClick={this.handleClick} id={pageNumbers[currentPage]}
                                          href={pageNumbers[currentPage]}>Next</PaginationLink>
                      }
                    </PaginationItem>

                    <PaginationItem>
                      {
                        currentPage === last ? <PaginationLink disabled>Last</PaginationLink> :
                          <PaginationLink onClick={this.handleLastClick} id={pageNumbers[currentPage]}
                                          href={pageNumbers[currentPage]}>Last</PaginationLink>
                      }
                    </PaginationItem>
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

export default benevoleMembre;
