import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import DataTable from '../../components/DataTable/DataTable';
import PageHeader from '../../components/PageHeader/PageHeader';
import { RemoteNotifications } from '../../../api/remoteNotifications/remoteNotifications';

class _RemoteNotifications extends Component {
  static propTypes = {
    isRemoteNotificationsReady: PropTypes.bool.isRequired,
    remoteNotifications: PropTypes.array.isRequired
  };

  fields = [
    {
      name: 'type',
      key: 'type',
      minWidth: '50px'
    },
    {
      name: 'title',
      key: 'title',
      minWidth: '150px'
    },
    {
      name: 'content',
      key: 'content'
    },
    {
      name: 'sent at',
      key: 'createdAt',
      minWidth: '100px'
    }
  ];

  pageHeaderItems = [
    {
      name: '마케팅'
    },
    {
      name: '푸쉬알람'
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
      type: 'all',
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
        type: 'all',
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

  render() {
    if (!this.props.isRemoteNotificationsReady) {
      return (
        <div />
      );
    }

    let remoteNotifications = _.clone(this.props.remoteNotifications);

    remoteNotifications = _.sortBy(remoteNotifications, (remoteNotification) => {
      return -remoteNotification.createdAt.getTime();
    });

    remoteNotifications.map((remoteNotification) => {
      remoteNotification.createdAt = moment(remoteNotification.createdAt).format('YYYY-MM-DD HH:mm');
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
        <PageHeader title="푸쉬알람" items={this.pageHeaderItems} />
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row">
            <div className="col-lg-12">
              <div className="ibox float-e-margins">
                <div className="ibox-title">
                  <h5>푸쉬알람</h5>
                </div>
                <div className="ibox-content">
                  <DataTable data={remoteNotifications} name="remote-notifications" fields={this.fields} isCheckboxVisible={false} />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <button data-toggle="modal" data-target="#sendingRemoteNotification" className="btn btn-primary">전체 푸쉬알람 보내기</button>
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
  const remoteNotificationsHandle = Meteor.subscribe('remoteNotifications');

  return {
    isRemoteNotificationsReady: remoteNotificationsHandle.ready(),
    remoteNotifications: RemoteNotifications.find({}).fetch()
  };
}, _RemoteNotifications);
