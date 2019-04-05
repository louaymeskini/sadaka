import React, { Component } from 'react';
import { HashRouter, Route, Switch ,Redirect, BrowserRouter as Router} from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading
});

const Register = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading
});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading
});

////session
const fakeAuth = {

  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }} />
  )} />
)



class App extends Component {
  constructor(){

    super();

    this.state={

      redirectToReferrer:"0",

    }

  }



  hettodo=(x)=>

  {
    this.setState({

      redirectToReferrer:x,

    })


  }

  render() {

    console.log("rrr App ", this.state.redirectToReferrer)

    const {redirectToReferrer} = this.state;
    if (redirectToReferrer === "1" && localStorage.getItem("token12") === "true") {
      return (

        <Router>

          <div>


            <Route path="/" name="Home" component={DefaultLayout}/>

          </div>
        </Router>
      );
    }


    else if (redirectToReferrer === "2" && localStorage.getItem("token12") === "true") {
      return (

        <Router>

          <div>


            <Route path="/" name="Home" component={DefaultLayout}/>

          </div>
        </Router>
      );
    }

    else if (redirectToReferrer === "0" && localStorage.getItem("token12") === "true") {
      return (

        <Router>

          <div>


            <Route path="/" name="Home" component={DefaultLayout}/>

          </div>
        </Router>
      );
    }
    else if (redirectToReferrer === "0" && localStorage.getItem("token12") === null) {
      return (

        <Router>

          <div>

            <Route exact path="/" name="Login Page" render={props => <Login hettodo={(x) => this.hettodo(x)}/>}/>

            <PrivateRoute exact path="/register" name="Register Page" component={Register}/>

            <Route exact path="*" name="Page 404" component={Page404}/>

            <PrivateRoute exact path="/500" name="Page 500" component={Page500}/>

            <PrivateRoute path="/home" name="Home" component={DefaultLayout}/>

          </div>
        </Router>

      );
    }
  }
}

export default App;
