import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as actions from '../redux/actions';
import { Loader } from 'semantic-ui-react';


const withAuth = WrappedComponent => {
  class AuthorizedComponent extends React.Component {

    componentDidMount() {
      if (localStorage.getItem('jwt') && !this.props.loggedIn) { this.props.fetchCurrentUser() }
    }

    render () {
      if (localStorage.getItem('jwt') && this.props.loggedIn) {
        return <WrappedComponent />
      } else if (localStorage.getItem('jwt') && this.props.authenticatingUser) {
        return <Loader active inline="centered" />
      } else if (localStorage.getItem('jwt') && this.props.loadingUser) {
        return <Loader active inline="centered" />
      } else {
        return <Redirect to="/" />
        }
      }
    }

    return connect(mapStateToProps, actions)(AuthorizedComponent)
  }

  const mapStateToProps = (state) => ({
    loggedIn: state.loggedIn,
    authenticatingUser: state.authenticatingUser,
    loadingUser: state.loadingUser
  })

export default withAuth
