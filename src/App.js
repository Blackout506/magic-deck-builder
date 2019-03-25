import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignUp();
  }

  render() {
    return (
      <div>
        <Layout />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(null, mapDispatchToProps)(App)
);
