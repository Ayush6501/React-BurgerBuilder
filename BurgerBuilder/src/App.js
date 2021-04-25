import React, { Component } from 'react';
import Layout from './containers/Layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
// import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import LandingPage from './components/Landing/Landing';
import ThankYou from './components/ThankYou/ThankYou';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/Auth" component={Auth} />
        <Route path="/BurgerBuilder" component={BurgerBuilder} />
        <Route exact path="/" component={LandingPage} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/Checkout" component={asyncCheckout} />
          <Route path="/Orders" component={asyncOrders} />
          <Route path="/Logout" component={Logout} />
          <Route path="/Auth" component={Auth} />
          <Route path="/Thankyou" component={ThankYou} />
          <Route path="/BurgerBuilder" component={BurgerBuilder} />
          <Route exact path="/" component={LandingPage} />
          <Redirect to="/" />
        </Switch>
      );
    };

    return (
        <div>
            <Layout>
              {routes}
            </Layout>
        </div>
    ); 
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

// C:\Users\Ayush\OneDrive\Desktop\Projects\React\burger-builder