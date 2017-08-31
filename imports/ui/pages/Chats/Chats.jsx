import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { imageUploader } from 'meteor/smartlinkcom:awsuploader';

import PageHeader from '../../components/PageHeader/PageHeader';
import { Chats } from '../../../api/chats/chats';
import ImageCropper from '../../components/ImageCropper/ImageCropper';

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
      if (message.type == 'text') {
        return (
          <div key={message._id} className={`chat-message ${ message.isSent ? 'left' : 'right' }`}>
            <img className="message-avatar" src={message.isSent ? '/custom_images/user.png' : '/custom_images/cs.png'} alt="" />
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
      }
      else if (message.type == 'image') {
        return (
          <div key={message._id} className={`chat-message ${ message.isSent ? 'left' : 'right' }`}>
            <img className="message-avatar" src={message.isSent ? '/custom_images/user.png' : '/custom_images/cs.png'} alt="" />
            <div className="message">
              { message.isSent &&
              <Link className="message-author" to={`/users/${message.user.id}`}>{ message.user.name }</Link>
              }
              { !message.isSent &&
              <span className="message-author">상담원</span>
              }
              <span className="message-date">{ moment(message.createdAt).format('YYYY-MM-DD HH:mm:ss') }</span>
              <div className="message-content">
                <div className="lightBoxGallery">
                  <a href={message.imageUrl} title="Image from Unsplash" data-gallery=""><img src={message.imageUrl} style={{ width: '50%' }} /></a>
                </div>
              </div>
            </div>
          </div>
        );
      }
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

  onClickUser = (room) => {
    this.setState({
      currentUserId: room.userId,
      currentUserName: room.userName,
    });

    Meteor.call('chats.setIsRead', {
      userId: room.userId,
    }, (error) => {
      if (error) {
        toastr.error(error.reason);
      }
    });
  };

  renderUsers = (groupedChats) => {
    let rooms = _.map(groupedChats, (chats, key) => {
      recentChat = _.maxBy(chats, (chat) => {
        return chat.createdAt.getTime()
      });

      return {
        userId: key,
        userName: chats[0].user.name,
        chats: chats,
        recentChat: recentChat
      };
    });

    rooms = _.sortBy(rooms, (room) => {
      return -room.recentChat.createdAt.getTime();
    });

    return _.map(rooms, (room) => {
      const length = _.reduce(room.chats, (sum, chat) => {
        if (chat.isSent && !chat.isRead) {
          return sum + 1;
        }

        return sum;
      }, 0);

      room.unreadCount = length;

      let isVisible = true;

      if (room.unreadCount == 0) {
        isVisible = false;
      }

      if (room.userId == this.state.currentUserId) {
        isVisible = false;
      }

      return (
        <div key={room.userId} className="chat-user">
          <img className="chat-avatar" src="/custom_images/user.png" alt="" />
          <div className="chat-user-name" style={{ display: 'inline-block' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => { this.onClickUser(room) }}>{ room.userName }</span>
          </div>
          { isVisible &&
            <span className="badge badge-pill badge-danger">{ room.unreadCount }</span>
          }
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

  onKeyPress = (event) => {
    if (event.key == 'Enter' && !event.shiftKey) {
      event.preventDefault();

      this.onClickSending();
    }
  };

  onClickSendingImage = () => {
    if (!this.state.currentUserId) {
      toastr.error('채팅할 사용자를 선택해주세요.');

      return;
    }

    this.imageCropperRef.getDataUrl((file) => {
      imageUploader.send(file, (error, downloadUrl) => {
        if (error) {
          toastr.error(error);

          return;
        }

        Meteor.call('chats.insert', {
          type: 'image',
          userIds: [this.state.currentUserId],
          imageUrl: downloadUrl
        }, (error) => {
          if (error) {
            toastr.error(error.reason);

            return;
          }

          $('#sendingImage').modal('hide');
        });
      });
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
        <div id="blueimp-gallery" className="blueimp-gallery">
          <div className="slides" />
          <h3 className="title" />
          <a className="prev">‹</a>
          <a className="next">›</a>
          <a className="close">×</a>
          <a className="play-pause" />
          <ol className="indicator" />
        </div>
        <div className="modal inmodal" id="sendingImage" tabIndex="-1" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content animated bounceInRight">
              <div className="modal-body">
                <ImageCropper ref={(ref) => { this.imageCropperRef = ref; }} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={this.onClickSendingImage}>보내기</button>
                <button className="btn btn-white" data-dismiss="modal">취소</button>
              </div>
            </div>
          </div>
        </div>
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
                          <textarea className="form-control message-input" placeholder="enter message. 'shift + enter' functions as line break. enter will directly send a message." id="message" onKeyPress={this.onKeyPress} />
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
                      <button data-toggle="modal" data-target="#sendingImage" className="btn btn-primary" style={{ marginLeft: '10px' }}>이미지 전송</button>
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
