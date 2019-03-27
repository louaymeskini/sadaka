import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
let prev  = 0;
let next  = 0;
let last  = 0;
let first = 0;

class benevole extends Component {

  constructor(){
    super();
    this.state={
      benevoles:[],
      currentPage: 1,
      todosPerPage: 5,
      warning: false,
      id:"",
      nom:""
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
      currentPage:last
    });
  }

  handleFirstClick(event) {

    event.preventDefault();

    this.setState({
      currentPage:1
    });
  }

  toggleWarning(e,id,nom) {
    e.preventDefault();
    console.log("id ",id);
    this.setState({
      warning: !this.state.warning,
    });
    this.setState({id:id})
    this.setState({nom:nom})
  }

  toggleWarningClose =()=> {
    this.setState({
      warning: !this.state.warning,
    });
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

  remove=(e)=>{
    e.preventDefault();
    //console.log("id: ",id);
    const headers={
      "content-type":"application/json",
      "x-access-token":localStorage.getItem("token")
    }
    fetch("http://127.0.0.1:8000/benevole/supprimer/"+this.state.id, {method: 'DELETE', headers:headers})
      .then(response => response.json())
      .then(data =>{
        console.log(data);
        if (data['state']==="non"){
          alert("benevole n est pas supprime");
        }
        else{
          //alert("suppression effectue");
          this.toggleWarningClose();
          this.getAll();
        }
      })
  }

  modif(e,id){
    e.preventDefault();
    console.log("id: ",id);
    localStorage.setItem("idBenevole",id);
    window.location.href="/#/home/benevole/modifier";
  }

  render() {

    let {benevoles, currentPage, todosPerPage} = this.state;


    // Logic for displaying current todos

    let indexOfLastTodo = currentPage * todosPerPage;

    let indexOfFirstTodo = indexOfLastTodo - todosPerPage;

    let currentTodos = benevoles.slice(indexOfFirstTodo, indexOfLastTodo);


    prev = currentPage > 0 ? (currentPage - 1) : 0;

    last = Math.ceil(benevoles.length / todosPerPage);

    next = (last === currentPage) ? currentPage : currentPage + 1;



    // Logic for displaying page numbers

    let pageNumbers = [];

    for (let i = 1; i <= last; i++) {
      pageNumbers.push(i);
    }

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

                    currentTodos.map((item,index) =>{

                      return(

                        <tr key={index}>

                        <td>{item.nom}</td>
                    <td>{item.prenom}</td>
                    <td>{item.sexe}</td>
                    <td>{item.ville}</td>
                    <td>{item.adresse}</td>
                    <td>{item.codePostale}</td>
                    <td>{item.tel}</td>
                    <td>{item.email}</td>
                    <td><i className="fa fa-edit" onClick={e=>this.modif(e,item._id)}></i></td>
                    <td><i className="fa fa-remove" onClick={e=>this.toggleWarning(e,item._id,item.nom)}></i></td>

                  </tr>
                      );

                    })

                  }
                  </tbody>
                </Table>

                <Modal isOpen={this.state.warning} toggle={this.toggleWarning}
                       className={'modal-warning ' + this.props.className}>
                  <ModalHeader toggle={this.toggleWarning}>Suppression Benevole</ModalHeader>
                  <ModalBody>
                    Voulez-vous vraiment supprimer le benevole <b>{this.state.nom} </b>!
                  </ModalBody>
                  <ModalFooter>
                    <Button color="warning" onClick={this.remove}>Supprimer</Button>{' '}
                    <Button color="secondary" onClick={this.toggleWarningClose}>Annuler</Button>
                  </ModalFooter>
                </Modal>

                <nav>

                  <Pagination>

                    <PaginationItem>
                      { prev === 0 ? <PaginationLink disabled>First</PaginationLink> :
                        <PaginationLink onClick={this.handleFirstClick} id={prev} href={prev}>First</PaginationLink>
                      }
                    </PaginationItem>
                    <PaginationItem>
                      { prev === 0 ? <PaginationLink disabled>Prev</PaginationLink> :
                        <PaginationLink onClick={this.handleClick} id={prev} href={prev}>Prev</PaginationLink>
                      }
                    </PaginationItem>
                    {
                      pageNumbers.map((number,i) =>
                        <Pagination key= {i}>
                          <PaginationItem active = {pageNumbers[currentPage-1] === (number) ? true : false} >
                            <PaginationLink onClick={this.handleClick} href={number} key={number} id={number}>
                              {number}
                            </PaginationLink>
                          </PaginationItem>
                        </Pagination>
                      )}

                    <PaginationItem>
                      {
                        currentPage === last ? <PaginationLink disabled>Next</PaginationLink> :
                          <PaginationLink onClick={this.handleClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Next</PaginationLink>
                      }
                    </PaginationItem>

                    <PaginationItem>
                      {
                        currentPage === last ? <PaginationLink disabled>Last</PaginationLink> :
                          <PaginationLink onClick={this.handleLastClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Last</PaginationLink>
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

export default benevole;
