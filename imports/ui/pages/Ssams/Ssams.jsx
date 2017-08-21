import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import DataTable from '../../components/DataTable/DataTable';
import PageHeader from '../../components/PageHeader/PageHeader';

class Ssams extends Component {
  static propTypes = {
    isSsamsReady: PropTypes.bool.isRequired,
    ssams: PropTypes.array.isRequired
  };

  state = {
    ssams: [],
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
      name: 'service count',
      key: 'profile.informationForSsam.serviceCount'
    },
    {
      name: 'service amount',
      key: 'profile.informationForSsam.serviceAmount'
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
      name: '쌤관리'
    }
  ];

  componentWillReceiveProps(nextProps) {
    nextProps.ssams.map((ssam) => {
      ssam.createdAt = moment(ssam.createdAt).format('YYYY-MM-DD');

      ssam.profile.informationForSsam.serviceCount = ssam.profile.informationForSsam.reservations.length;

      const serviceAmount = _.reduce(ssam.profile.informationForSsam.reservations, (sum, reservation) => {
        return sum + reservation.price.amount;
      }, 0);

      ssam.profile.informationForSsam.serviceAmount = this.getPrice(serviceAmount);
    });
  }

  getPrice = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
  };

  onChangeChecked = (checkedIds) => {
    this.setState({
      checkedIds: checkedIds
    });
  };

  render() {
    if (!this.props.isSsamsReady) {
      return (
        <div />
      );
    }

    return (
      <div>
        <PageHeader title="쌤관리" items={this.pageHeaderItems} />
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row">
            <div className="col-lg-12">
              <div className="ibox float-e-margins">
                <div className="ibox-title">
                  <h5>쌤관리</h5>
                </div>
                <div className="ibox-content">
                  <DataTable data={this.props.ssams} name="ssams" fields={this.fields} onChangeChecked={this.onChangeChecked} />
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
  const ssamsHandle = Meteor.subscribe('ssams');

  return {
    isSsamsReady: ssamsHandle.ready(),
    ssams: Meteor.users.find({
      'profile.isSsam': true
    }).fetch()
  };
}, Ssams);
