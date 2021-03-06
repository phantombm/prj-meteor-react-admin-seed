import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { Notices } from '../../../api/notices/notices';
import PageHeader from '../../components/PageHeader/PageHeader';

class _Notices extends Component {
  static propTypes = {
    isNoticesReady: PropTypes.bool.isRequired,
    notices: PropTypes.array.isRequired
  };

  pageHeaderItems = [
    {
      name: '앱관리'
    },
    {
      name: '공지사항'
    }
  ];

  renderNotices = () => {
    const notices = _.sortBy(this.props.notices, (notice) => {
      return -notice.createdAt.getTime();
    });

    return notices.map((notice) => {
      return (
        <tr key={notice._id}>
          <td className="project-title">
            <Link to={`/notices/edit/${notice._id}`}>{ notice.title }</Link><br />
            <small>{ moment(notice.createdAt).format('YYYY-MM-DD HH:mm') }</small>
          </td>
          <td className="project-actions">
            <Link to={`/notices/edit/${notice._id}`} className="btn btn-white btn-sm"><i className="fa fa-pencil" /> 수정</Link>
            <div onClick={() => { this.onClickDeletingNotice(notice); }} className="btn btn-danger btn-sm" style={{ marginLeft: 5 }}><i className="fa fa-close" /> 삭제</div>
          </td>
        </tr>
      );
    });
  };

  onClickDeletingNotice = (notice) => {
    swal({
      title: '삭제하시겠습니까?',
      text: `${notice.title}을 삭제합니다.`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ed5565',
      confirmButtonText: '삭제',
      closeOnConfirm: false
    }, function () {
      Meteor.call('notices.delete', {
        noticeId: notice._id
      }, (error) => {
        if (error) {
          toastr.error(error.reason);

          return;
        }

        swal('삭제되었습니다.', '', 'success');
      });
    });
  };

  render() {
    if (!this.props.isNoticesReady) {
      return (
        <div />
      );
    }

    return (
      <div>
        <PageHeader title="공지사항" items={this.pageHeaderItems} />
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="ibox">
            <div className="ibox-title">
              <h5>공지사항</h5>
              <div className="ibox-tools">
                <Link to="/notices/write">
                  <div className="btn btn-primary btn-xs">공지사항 쓰기</div>
                </Link>
              </div>
            </div>
            <div className="ibox-content">
              <div className="project-list">
                <table className="table table-hover">
                  <tbody>
                    { this.renderNotices() }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  const noticesHandle = Meteor.subscribe('notices');

  return {
    isNoticesReady: noticesHandle.ready(),
    notices: Notices.find({}).fetch()
  };
}, _Notices);
