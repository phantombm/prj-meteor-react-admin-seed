import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import DataTable from '../../components/DataTable/DataTable';
import PageHeader from '../../components/PageHeader/PageHeader';

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
      key: 'profile.name'
    },
    {
      name: 'social',
      key: 'profile.signInType'
    },
    {
      name: 'email',
      key: 'profile.email'
    },
    {
      name: 'phone number',
      key: 'profile.phoneNumber'
    },
    {
      name: 'phurchase count',
      key: 'profile.phurchaseCount'
    },
    {
      name: 'phurchase amount',
      key: 'profile.phurchaseAmount'
    },
    {
      name: 'created at',
      key: 'createdAt'
    }
  ];

  pageHeaderItems = [
    {
      name: '회원관리'
    },
    {
      name: '고객관리'
    }
  ];

  getPrice = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
  };

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

    this.props.users.map((user) => {
      user.createdAt = moment(user.createdAt).format('YYYY-MM-DD');

      user.profile.phurchaseCount = user.profile.reservations.length;

      const phurchaseAmount = _.reduce(user.profile.reservations, (sum, reservation) => {
        return sum + reservation.price.amount;
      }, 0);

      user.profile.phurchaseAmount = this.getPrice(phurchaseAmount);
    });

    return (
      <div>
        <PageHeader title="고객관리" items={this.pageHeaderItems} />
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
      </div>
    );
  }
}

export default createContainer(() => {
  const usersHandle = Meteor.subscribe('users');

  return {
    isUsersReady: usersHandle.ready(),
    users: Meteor.users.find({
      'profile.isSsam': false
    }).fetch()
  };
}, Users);
