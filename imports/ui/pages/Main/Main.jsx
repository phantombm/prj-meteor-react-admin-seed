import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class Main extends Component {
  static propTypes = {
    isLoggingIn: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
  };

  render() {
    if (this.props.isLoggingIn) {
      return (
        <div />
      );
    }

    if (!this.props.user._id) {
      return (
        <Redirect to="/signIn" />
      );
    }
    else {
      return (
        <Redirect to="/dashboard" />
      );
    }
  }
}

export default createContainer(() => {
  return {
    isLoggingIn: Meteor.loggingIn(),
    user: Meteor.user() || {}
  };
}, Main);
