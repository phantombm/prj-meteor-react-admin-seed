import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

import DataTable from '../../components/DataTable/DataTable';

class Users extends Component {
  static propTypes = {
    isUsersReady: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired
  };

  state = {
    checkedIds: []
  };

  fields = [
    {
      name: 'id',
      key: '_id',
      linkTo: '/users'
    },
    {
      name: 'name',
      key: 'username',
      linkTo: '/users'
    },
    {
      name: 'email',
      key: 'emails.0.address'
    },
    {
      name: 'phone number',
      key: 'profile.cellPhoneNumber'
    },
    {
      name: 'purchase count',
      key: 'profile.purchaseNumber'
    },
    {
      name: 'purchase amount',
      key: 'profile.purchaseAmount'
    }
  ];

  onChangeChecked = (checkedIds) => {
    this.setState({
      checkedIds: checkedIds
    });
  };

  render() {
    if (!this.props.isUsersReady) {
      return (
        <div />
      );
    }

    return (
      <div className="wrapper wrapper-content animated fadeInRight">
        <div className="row">
          <div className="col-lg-12">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5>고객관리</h5>
              </div>
              <div className="ibox-content">
                <DataTable data={this.props.users} name="users" fields={this.fields} onChangeChecked={this.onChangeChecked} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  const usersHandle = Meteor.subscribe('users');

  return {
    isUsersReady: usersHandle.ready(),
    users: Meteor.users.find({}).fetch()
  };
}, Users);
