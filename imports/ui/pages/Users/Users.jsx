import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { Redirect } from 'react-router-dom';

import DataTable from '../../components/DataTable/DataTable';
import PageHeader from '../../components/PageHeader/PageHeader';

class Users extends Component {
  static propTypes = {
    isUsersReady: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired
  };

  state = {
    checkedIds: [],
    isRedirected: false,
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD')
  };

  fields = [
    {
      name: 'name',
      key: 'profile.name',
      linkTo: '/users'
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

  componentDidUpdate() {
    if (this.isInitialized) {
      return;
    }

    $.fn.datepicker.dates['ko'] = {
      days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
      daysShort: ['일', '월', '화', '수', '목', '금', '토'],
      daysMin: ['일', '월', '화', '수', '목', '금', '토'],
      months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      today: '오늘',
      clear: '삭제',
      format: 'yyyy-mm-dd',
      titleFormat: 'yyyy년 mm월'
    };
    
    $('#data_5 .input-daterange').datepicker({
      keyboardNavigation: false,
      forceParse: false,
      autoclose: true,
      language: 'ko'
    }).on('changeDate', () => {
      this.setState({
        startDate: $('#startDate').val(),
        endDate: $('#endDate').val()
      });
    });

    this.isInitialized = true;
  }

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

    let users = _.cloneDeep(this.props.users);

    users = _.filter(users, (user) => {
      return moment(user.profile.createdAt).format('YYYY-MM-DD') >= moment(this.state.startDate).format('YYYY-MM-DD') && moment(user.profile.createdAt).format('YYYY-MM-DD') <= moment(this.state.endDate).format('YYYY-MM-DD');
    });

    users.map((user) => {
      user.createdAt = moment(user.createdAt).format('YYYY-MM-DD');

      user.profile.phurchaseCount = user.profile.reservations.length;

      const phurchaseAmount = _.reduce(user.profile.reservations, (sum, reservation) => {
        return sum + reservation.price.amount;
      }, 0);

      user.profile.phurchaseAmount = this.getPrice(phurchaseAmount);
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
        <PageHeader title="고객관리" items={this.pageHeaderItems} />
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row">
            <div className="col-lg-12">
              <div className="ibox float-e-margins">
                <div className="ibox-title">
                  <h5>고객관리</h5>
                </div>
                <div className="ibox-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group" id="data_5">
                        <label className="font-normal">가입일 검색</label>
                        <div className="input-daterange input-group" id="datepicker">
                          <input type="text" className="input-sm form-control" id="startDate" defaultValue={moment().format('YYYY-MM-DD')} />
                          <span className="input-group-addon">to</span>
                          <input type="text" className="input-sm form-control" id="endDate" defaultValue={moment().format('YYYY-MM-DD')} />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <DataTable data={users} name="users" fields={this.fields} onChangeChecked={this.onChangeChecked} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <button data-toggle="modal" data-target="#sendingRemoteNotification" className="btn btn-primary">푸쉬알람 보내기</button>
              <button onClick={this.onClickChatting} className="btn btn-primary" style={{ marginLeft: '10px' }}>채팅 시작하기</button>
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
      'profile.isSsam': false
    }).fetch()
  };
}, Users);
