import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import axios from "axios/index";
let prev  = 0;
let next  = 0;
let last  = 0;
let first = 0;

class evenement extends Component {

  constructor(){
    super();
    this.state={
      evenements:[],
      evenements1:[],
      currentPage: 1,
      todosPerPage: 5,
      warning: false,
      id:"",
      titre:""
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

  toggleWarning(e,id,titre) {
    e.preventDefault();
    console.log("id ",id);
    this.setState({
      warning: !this.state.warning,
    });
    this.setState({id:id})
    this.setState({titre:titre})
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
    fetch("http://localhost:8000/association/liste/evenement/"+localStorage.getItem("idAssociation"), {method: 'GET',headers:headers })
      .then(response => response.json())
      .then(data =>{
        console.log(data);
        //console.log("event",data.evenements);
        for(var i=0; i<data.length ;i++) {
          for (var j = 0; j < data[i]['evenements'].length; j++) {
            console.log("evenements ", data[i]['evenements'][j])
            this.state.evenements.push(data[i]['evenements'][j])
          }
        }
        //this.setState({evenements:data})
        this.setState({evenements1:this.state.evenements})
      })
  }

  remove=(e)=>{
    e.preventDefault();
    //console.log("id: ",id);
    const headers={
      "content-type":"application/json",
      "x-access-token":localStorage.getItem("token")
    }

    axios.delete("http://127.0.0.1:8000/evenement/supprimer/"+this.state.id,{headers: headers})
      .then(res=> {
        console.log(res.data)
        fetch("http://127.0.0.1:8000/association/supprimer/"+localStorage.getItem("idAssociation")+"/evenement/"+this.state.id, {method: 'PUT', headers:headers})
          .then(response => response.json())
          .then(data => {
            console.log(data);
            if (data['state'] === "non") {
              alert("evenement n est pas supprime");
            }
            else {
              //alert("suppression effectue");
              //this.getAll();
              this.toggleWarningClose();
              window.location.reload();

            }
          })
      })
  }

  /*modif(e,id){
    e.preventDefault();
    console.log("id: ",id);
    localStorage.setItem("id",id);
    window.location.href="/#/home/evenement/modifier";
  }*/

  render() {

    let {evenements1, currentPage, todosPerPage} = this.state;


    // Logic for displaying current todos

    let indexOfLastTodo = currentPage * todosPerPage;

    let indexOfFirstTodo = indexOfLastTodo - todosPerPage;

    let currentTodos = evenements1.slice(indexOfFirstTodo, indexOfLastTodo);


    prev = currentPage > 0 ? (currentPage - 1) : 0;

    last = Math.ceil(evenements1.length / todosPerPage);

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
                <i className="fa fa-align-justify"></i> Liste des Evenements
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Titre Evenement</th>
                    <th>Sujet</th>
                    <th>Ville</th>
                    <th>Adresse</th>
                    <th>Date</th>
                    <th scope="col">Remove</th>
                  </tr>
                  </thead>
                  <tbody>
                  {

                    currentTodos.map((item,index) =>{

                      return(

                        <tr key={index}>
                    <td>{item.titre}</td>
                    <td>{item.sujet}</td>
                    <td>{item.ville}</td>
                    <td>{item.adresse}</td>
                    <td>{item.date}</td>
                    <td><i className="fa fa-remove" onClick={e=>this.toggleWarning(e,item._id,item.titre)}></i></td>

                  </tr>
                      );

                    })

                  }
                  </tbody>
                </Table>

                <Modal isOpen={this.state.warning} toggle={this.toggleWarning}
                       className={'modal-warning ' + this.props.className}>
                  <ModalHeader toggle={this.toggleWarning}>Suppression Evenement</ModalHeader>
                  <ModalBody>
                    Voulez-vous vraiment supprimer l'evenement <b>{this.state.titre} </b>!
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

export default evenement;
