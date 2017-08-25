import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';

import PageHeader from '../../components/PageHeader/PageHeader';
import { Chats } from '../../../api/chats/chats';

class _Chats extends Component {
  static propTypes = {
    isChatsReady: PropTypes.bool.isRequired,
    chats: PropTypes.array.isRequired
  };

  state = {
    currentUserId: null,
    currentUserName: null
  };

  pageHeaderItems = [
    {
      name: '모니터링'
    },
    {
      name: '채팅'
    }
  ];

  componentDidUpdate() {
    $('.chat-discussion').animate({
      scrollTop: 300 * $('.chat-discussion > div').length
    }, 500);
  }

  renderMessages = (messages) => {
    return messages.map((message) => {
      return (
        <div key={message._id} className={`chat-message ${ message.isSent ? 'left' : 'right' }`}>
          <img className="message-avatar" src="img/a1.jpg" alt="" />
          <div className="message">
            { message.isSent &&
              <Link className="message-author" to={`/users/${message.user.id}`}>{ message.user.name }</Link>
            }
            { !message.isSent &&
              <span className="message-author">상담원</span>
            }
            <span className="message-date">{ moment(message.createdAt).format('YYYY-MM-DD HH:mm:ss') }</span>
            <div className="message-content">
              { this.renderMessage(message.message) }
            </div>
          </div>
        </div>
      );
    });
  };

  renderMessage = (message) => {
    const messages = message.split('\n');

    return messages.map((message, index) => {
      return (
        <div key={index}>{ message }</div>
      );
    });
  };

  onClickUser = (chat) => {
    this.setState({
      currentUserId: chat[0].user.id,
      currentUserName: chat[0].user.name
    });
  };

  renderUsers = (groupedChats) => {
    return _.map(groupedChats, (chat, key) => {
      return (
        <div key={key} className="chat-user">
          <img className="chat-avatar" src="img/a4.jpg" alt="" />
          <div className="chat-user-name" style={{ display: 'inline-block' }}>
            <a href="#" onClick={() => { this.onClickUser(chat) }}>{ chat[0].user.name }</a>
          </div>
          <div style={{ display: 'inline-block', top: '2px', left: '-10px', paddingLeft: '4px', paddingRight: '4px', height: '14px', backgroundColor: '#ff0000', color: '#ffffff', borderRadius: '7px', fontSize: '11px', textAlign: 'center' }}>{ chat.length }</div>
        </div>
      );
    });
  };

  onClickSending = () => {
    if (!this.state.currentUserId) {
      toastr.error('채팅할 사용자를 선택해주세요.');

      return;
    }

    if ($('#message').val() == '') {
      toastr.error('메세지를 입력해주세요.');

      return;
    }

    Meteor.call('chats.insert', {
      type: 'text',
      userIds: [this.state.currentUserId],
      message: $('#message').val()
    }, (error) => {
      if (error) {
        toastr.error(error.reason);

        return;
      }

      $('#message').val('');
    });
  };

  render() {
    if (!this.props.isChatsReady) {
      return (
        <div />
      );
    }

    if (this.props.chats.length == 0) {
      return (
        <div />
      );
    }

    const groupedChats = _.groupBy(this.props.chats, (chat) => {
      return chat.user.id;
    });

    let messages = null;

    if (this.state.currentUserId) {
      messages = groupedChats[this.state.currentUserId];
    }
    else {
      messages = []
    }

    return (
      <div>
        <PageHeader title="쌤관리" items={this.pageHeaderItems} />
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row">
            <div className="col-lg-12">
              <div className="ibox chat-view">
                <div className="ibox-title">{ this.state.currentUserName || '채팅할 유저를 선택해주세요.' }</div>
                <div className="ibox-content">
                  <div className="row">
                    <div className="col-md-9 ">
                      <div className="chat-discussion">
                        { this.renderMessages(messages) }
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="chat-users">
                        <div className="users-list">
                          { this.renderUsers(groupedChats) }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="chat-message-form">
                        <div className="form-group">
                          <textarea className="form-control message-input" placeholder="Enter message text" id="message" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div style={{ height: '10px' }} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <button onClick={this.onClickSending} className="btn btn-primary" style={{ marginLeft: '10px' }}>전송</button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div style={{ height: '10px' }} />
                    </div>
                  </div>
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
  const chatsHandle = Meteor.subscribe('chats');

  return {
    isChatsReady: chatsHandle.ready(),
    chats: Chats.find({}).fetch()
  };
}, _Chats);
