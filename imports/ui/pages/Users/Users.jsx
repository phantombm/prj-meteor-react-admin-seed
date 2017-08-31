import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { Redirect } from 'react-router-dom';

import PageHeader from '../../components/PageHeader/PageHeader';
import DataViewer from '../../components/DataViewer/DataViewer';

class Users extends Component {
  static propTypes = {
    isUsersReady: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired
  };

  state = {
    checkedIds: [],
    isRedirected: false
  };

  fields = [
    {
      name: '이름',
      key: 'profile.name',
      linkTo: '/users'
    },
    {
      name: '소셜',
      key: 'profile.signInType'
    },
    {
      name: '이메일',
      key: 'profile.email'
    },
    {
      name: '휴대폰',
      key: 'profile.phoneNumber'
    },
    {
      name: '구매수',
      key: 'profile.phurchaseCount'
    },
    {
      name: '구매금액',
      key: 'profile.phurchaseAmount'
    },
    {
      name: '가입일',
      key: 'createdAt',
      isSearchableDate: true
    }
  ];

  pageHeaderItems = [
    {
      name: '회원관리'
    },
    {
      name: '고객'
    }
  ];

  onClickSending = () => {
    if ($('.title').val() == '') {
      toastr.error('제목을 써주세요.');

      return;
    }

    if ($('.content').val() == '') {
      toastr.error('내용을 써주세요.');

      return;
    }

    Meteor.call('sendRemoteNotifications', {
      type: 'partial',
      to: this.state.checkedIds,
      message: {
        title: $('.title').val(),
        body: $('.content').val()
      }
    }, (error) => {
      if (error) {
        toastr.error(error.reason);

        return;
      }

      Meteor.call('remoteNotifications.insert', {
        type: 'partial',
        title: $('.title').val(),
        content: $('.content').val()
      }, (error) => {
        if (error) {
          toastr.error(error.reason);

          return;
        }

        $('#sendingRemoteNotification').modal('hide');
      });
    });
  };

  getPrice = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
  };

  onChangeChecked = (checkedIds) => {
    this.setState({
      checkedIds: checkedIds
    });
  };

  onClickChatting = () => {
    Meteor.call('chats.insert', {
      type: 'text',
      userIds: this.state.checkedIds,
      message: '채팅을 시작합니다.'
    }, (error) => {
      if (error) {
        toastr.error(error.reason);

        return;
      }

      this.setState({
        isRedirected: true
      });
    });
  };

  onClickAppointingManager = () => {
    let isValid = true;

    this.state.checkedIds.forEach((id) => {
      if (!isValid) {
        return;
      }

      const user = _.find(this.props.users, {
        _id: id
      });

      if (user.profile.signInType != 'password') {
        isValid = false;
      }
    });

    if (!isValid) {
      toastr.error('이메일로 가입한 사용자만 임명할 수 있습니다.');

      return;
    }

    Meteor.call('users.setIsManager', {
      ids: this.state.checkedIds,
      isManager: true
    }, (error) => {
      if (error) {
        toastr.error(error.reason);

        return;
      }

      toastr.success('임명되었습니다.');
    });
  };

  render() {
    if (!this.props.isUsersReady) {
      return (
        <div />
      );
    }

    if (this.state.isRedirected) {
      return (
        <Redirect to="/chats" />
      );
    }

    const users = _.cloneDeep(this.props.users);

    users.map((user) => {
      user.createdAt = moment(user.createdAt).format('YYYY-MM-DD');

      user.profile.phurchaseCount = _.padStart(user.profile.reservations.length, 5, '0');

      const phurchaseAmount = _.reduce(user.profile.reservations, (sum, reservation) => {
        return sum + reservation.price.amount;
      }, 0);

      user.profile.phurchaseAmount = this.getPrice(_.padStart(phurchaseAmount, 9, '0'));
    });

    return (
      <div>
        <div className="modal inmodal" id="sendingRemoteNotification" tabIndex="-1" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content animated bounceInRight">
              <div className="modal-header">
                <i className="fa fa-paper-plane modal-icon" />
                <h4 className="modal-title">푸쉬 알람</h4>
              </div>
              <div className="modal-body">
                <p>
                  푸쉬알람을 보냅니다.<br />
                  다수의 사용자에게 보내는 것이므로 신중히 작성하시기 바랍니다.
                </p>
                <div className="form-group">
                  <input placeholder="제목" className="form-control title" />
                </div>
                <div className="form-group">
                  <input placeholder="내용" className="form-control content" />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={this.onClickSending}>보내기</button>
                <button className="btn btn-white" data-dismiss="modal">취소</button>
              </div>
            </div>
          </div>
        </div>
        <PageHeader title="고객" items={this.pageHeaderItems} />
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row">
            <div className="col-lg-12">
              <div className="ibox float-e-margins">
                <div className="ibox-title">
                  <h5>고객관리</h5>
                </div>
                <div className="ibox-content">
                  <DataViewer name="users" fields={this.fields} data={users} onChangeChecked={this.onChangeChecked} />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <button data-toggle="modal" data-target="#sendingRemoteNotification" className="btn btn-primary">푸쉬알람 보내기</button>
              <button onClick={this.onClickChatting} className="btn btn-primary" style={{ marginLeft: '10px' }}>채팅 시작하기</button>
              <button onClick={this.onClickAppointingManager} className="btn btn-primary pull-right" style={{ marginLeft: '10px' }}>관리자 임명</button>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div style={{ height: '30px' }} />
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
      'profile.isSsam': false,
      'profile.isManager': false
    }).fetch()
  };
}, Users);
