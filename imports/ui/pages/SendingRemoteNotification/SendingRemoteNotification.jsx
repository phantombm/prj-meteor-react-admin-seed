import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';

import PageHeader from '../../components/PageHeader/PageHeader';

export default class SendingRemoteNotification extends Component {
  state = {
    isRedirected: false
  };

  pageHeaderItems = [
    {
      name: '마케팅'
    },
    {
      name: '푸쉬알람',
      linkTo: '/remoteNotifications'
    },
    {
      name: '전체 푸쉬알람 보내기'
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

    Meteor.call('remoteNotifications.insert', {
      type: 'all',
      title: $('.title').val(),
      content: $('.summernote').summernote('code')
    }, (error) => {
      if (error) {
        toastr.error(error.reason);

        return;
      }

      this.redirect();
    });
  };

  redirect = () => {
    this.setState({
      isRedirected: true
    });
  };

  render() {
    if (this.state.isRedirected) {
      return (
        <Redirect to="/remoteNotifications" />
      );
    }

    return (
      <div>
        <div className="modal inmodal" id="sendingRemoteNotification" tabindex="-1" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content animated bounceInRight">
              <div className="modal-header">

              </div>
              <div className="modal-body">
                <p><strong>Lorem Ipsum is simply dummy</strong> text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                  remaining essentially unchanged.</p>
                <div className="form-group"><label>Sample Input</label> <input type="email" placeholder="Enter your email" className="form-control" /></div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-white" data-dismiss="modal">Close</button>
                <button className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        <PageHeader title="전체 푸쉬알람 보내기" items={this.pageHeaderItems} />
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row">
            <div className="col-lg-12">
              <div className="ibox float-e-margins">
                <div className="form-group">
                  <input className="form-control title" placeholder="제목" />
                </div>
                <div className="form-group">
                  <textarea className="form-control message-input" placeholder="내용" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <button data-toggle="modal" data-target="#sendingRemoteNotification" className="btn btn-primary">보내기</button>
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
