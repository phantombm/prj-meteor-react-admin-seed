import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { Reservations } from '../../../api/reservations/reservations';
import moment from 'moment';

import PageHeader from '../../components/PageHeader/PageHeader';
import Profile from '../../components/Profile/Profile';

class User extends Component {
  static propTypes = {
    isReservationsReady: PropTypes.bool.isRequired,
    reservations: PropTypes.array.isRequired,
    isUsersReady: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
  };

  pageHeaderItems = [
    {
      name: '회원관리'
    },
    {
      name: '고객',
      linkTo: '/users'
    },
    {
      name: '프로필'
    }
  ];

  getPrice = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
  };

  render() {
    if (!this.props.isUsersReady || !this.props.isReservationsReady) {
      return (
        <div />
      );
    }

    const userProfile = this.props.user.profile;

    const roles = ['사용자'];

    if (userProfile.isOwner) {
      roles.push('소유자');
    }

    if (userProfile.isManager) {
      roles.push('관리자');
    }

    if (userProfile.isSsam) {
      roles.push('쌤');
    }

    const profile = {
      name: userProfile.name,
      signInType: userProfile.signInType,
      roles: roles,
      introduction: userProfile.informationForSsam.introduction,
      imageUrl: userProfile.informationForSsam.imageUrl
    };

    const completedReservations = _.filter(this.props.reservations, (reservation) => {
      if (reservation.progress == 'waiting for writing review' || reservation.progress == 'completed') {
        return true;
      }
    });

    let phurchaseAmount = _.reduce(completedReservations, (sum, reservation) => {
      return sum + reservation.price.amount;
    }, 0);

    phurchaseAmount = this.getPrice(phurchaseAmount);

    const proceedingReservations = _.filter(this.props.reservations, (reservation) => {
      if (reservation.progress == 'waiting for writing review' || reservation.progress == 'completed') {
        return false;
      }

      return true;
    });

    const statistics = [
      {
        firstItem: {
          name: '서비스 받은 횟수',
          value: completedReservations.length
        },
        secondItem: {
          name: '서비스 받은 총금액',
          value: phurchaseAmount
        }
      },
      {
        firstItem: {
          name: '서비스 진행중',
          value: proceedingReservations.length
        },
        secondItem: {
          name: '',
          value: ''
        }
      }
    ];

    let recentCompletedReservations = _.sortBy(completedReservations, [
      (reservation) => {
        return reservation.service.scheduledAt.getTime();
      }
    ]);

    recentCompletedReservations = recentCompletedReservations.splice(0, 5);

    const recentPhurchaseAmount = _.reduce(recentCompletedReservations, (sum, reservation) => {
      return sum + reservation.price.amount;
    }, 0);

    const recentPhurchaseAmounts = _.map(recentCompletedReservations, (reservation) => {
      return reservation.price.amount;
    });

    const graph = {
      name: '최근 서비스 금액',
      value: this.getPrice(recentPhurchaseAmount),
      values: recentPhurchaseAmounts
    };

    const basicInformation = [
      {
        name: '이름',
        value: userProfile.name
      },
      {
        name: '소셜',
        value: userProfile.signInType
      },
      {
        name: '이메일',
        value: userProfile.email
      },
      {
        name: '휴대폰',
        value: userProfile.phoneNumber
      },
      {
        name: '가입일',
        value: moment(this.props.user.createAt).format('YYYY-MM-DD')
      }
    ];

    return (
      <div>
        <PageHeader title="프로필" items={this.pageHeaderItems} />
        <Profile profile={profile} statistics={statistics} graph={graph} basicInformation={basicInformation} addresses={userProfile.addresses} />
      </div>
    );
  }
}

export default createContainer((props) => {
  const usersHandle = Meteor.subscribe('users');
  const reservationsHandle = Meteor.subscribe('reservations', props.match.params.id);

  return {
    isReservationsReady: reservationsHandle.ready(),
    reservations: Reservations.find({
      'user.userId': props.match.params.id
    }).fetch(),
    isUsersReady: usersHandle.ready(),
    user: Meteor.users.findOne({
      _id: props.match.params.id
    }) || {}
  };
}, User);
