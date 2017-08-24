import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import PageHeader from '../../components/PageHeader/PageHeader';
import { Chats } from '../../../api/chats/chats';

class _Chats extends Component {
  static propTypes = {
    isChatsReady: PropTypes.bool.isRequired,
    chats: PropTypes.array.isRequired
  };

  state = {
    currentUserId: null
  };

  pageHeaderItems = [
    {
      name: '모니터링'
    },
    {
      name: '채팅'
    }
  ];

  renderMessages = (messages) => {
    return messages.map((message) => {
      return (
        <div key={message._id} className={`chat-message ${ message.from.userId == Meteor.userId() ? 'right' : 'left' }`}>
          <img className="message-avatar" src="img/a1.jpg" alt="" />
          <div className="message">
            <div className="message-author">{ message.from.name }</div>
            <span className="message-date">{ moment(message.createdAt).format('YYYY-MM-DD HH:mm:ss') }</span>
            <span className="message-content">{ message.message }</span>
          </div>
        </div>
      );
    });
  };

  renderUsers = (users) => {
    return users.map((user, index) => {
      return (
        <div key={index} className="chat-user">
          <img className="chat-avatar" src="img/a4.jpg" alt="" />
          <div className="chat-user-name">
            <a href="#" onClick={() => { this.setState({ currentUserId: user.id }); }}>{ user.name }</a>
          </div>
        </div>
      );
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

    // const groupedChats = _.groupBy(this.props.chats, (chat) => {
    //   return chat.from.userId;
    // });
    //
    // let messages = null;
    //
    // if (this.state.currentUserId) {
    //   messages = groupedChats[this.state.currentUserId];
    // }
    // else {
    //   messages = []
    // }
    //
    // const omittedChats = _.omit(this.props.chats, (chat) => {
    //   return chat.from.userId == Meteor.userId();
    // });
    //
    // const groupedOmittedChats = _.groupBy(omittedChats, (chat) => {
    //   return chat.from.userId;
    // });
    //
    // let messages = null;
    //
    // if (this.state.currentUserId) {
    //   messages = groupedChats[this.state.currentUserId];
    // }
    // else {
    //   messages = []
    // }

    return (
      <div>
        <PageHeader title="쌤관리" items={this.pageHeaderItems} />
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="ibox-title">
            <h5>채팅</h5>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div style={{ height: '15px' }} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="ibox chat-view">
                <div className="ibox-title">
                  Chat room panel <small className="pull-right text-muted">Last message:  Mon Jan 26 2015 - 18:39:23</small>
                </div>
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
                          <textarea className="form-control message-input" name="message" placeholder="Enter message text" />
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
