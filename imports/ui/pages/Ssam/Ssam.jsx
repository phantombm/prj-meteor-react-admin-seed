import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import PageHeader from '../../components/PageHeader/PageHeader';
import Profile from '../../components/Profile/Profile';

class User extends Component {
  static propTypes = {
    isUsersReady: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
  };

  pageHeaderItems = [
    {
      name: '회원관리'
    },
    {
      name: '쌤관리',
      linkTo: '/ssams'
    },
    {
      name: '프로필'
    }
  ];

  render() {
    if (!this.props.isUsersReady) {
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
      imageUrl: userProfile.informationForSsam.imageUrl || 'http://file2.instiz.net/data/file2/2016/01/05/8/1/6/816140efeb4b5edb67df6532837ad1e1.jpg'
    };

    const statistics = [
      {
        firstItem: {
          name: '서비스 횟수',
          value: 30
        },
        secondItem: {
          name: '서비스 총금액',
          value: 100000000
        }
      },
      {
        firstItem: {
          name: '서비스 진행중',
          value: 30
        },
        secondItem: {
          name: '리뷰',
          value: 30
        }
      }
    ];

    const graph = {
      name: '최근 서비스 금액',
      value: 400000,
      values: [10000, 300000, 20000, 100000, 300000]
    };

    return (
      <div>
        <PageHeader title="프로필" items={this.pageHeaderItems} />
        <Profile profile={profile} statistics={statistics} graph={graph} />
      </div>
    );
  }
}

export default createContainer((props) => {
  const usersHandle = Meteor.subscribe('users');

  return {
    isUsersReady: usersHandle.ready(),
    user: Meteor.users.findOne({
      _id: props.match.params.id
    }) || {}
  };
}, User);
