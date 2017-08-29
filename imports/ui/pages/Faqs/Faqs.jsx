import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { Faqs } from '../../../api/faqs/faqs';

import PageHeader from '../../components/PageHeader/PageHeader';

class _Faqs extends Component {
  static propTypes = {
    isFaqsReady: PropTypes.bool.isRequired,
    faqs: PropTypes.array.isRequired
  };

  pageHeaderItems = [
    {
      name: '앱관리'
    },
    {
      name: 'FAQ'
    }
  ];

  renderNotices = () => {
    const faqs = _.sortBy(this.props.faqs, [
      (faq) => {
        return -parseFloat(faq.order);
      },
      (faq) => {
        return -faq.createdAt.getTime();
      }
    ]);

    return faqs.map((faq) => {
      return (
        <tr key={faq._id}>
          <td className="project-title">
            <Link to={`/faqs/edit/${faq._id}`}>{ faq.title }</Link><br />
            <small>{ moment(faq.createdAt).format('YYYY-MM-DD HH:mm') }</small>
          </td>
          <td className="project-actions">
            <Link to={`/faqs/edit/${faq._id}`} className="btn btn-white btn-sm"><i className="fa fa-pencil" /> 수정</Link>
            <div onClick={() => { this.onClickDeletingFaq(faq); }} className="btn btn-danger btn-sm" style={{ marginLeft: 5 }}><i className="fa fa-close" /> 삭제</div>
          </td>
        </tr>
      );
    });
  };

  onClickDeletingFaq = (faq) => {
    swal({
      title: '삭제하시겠습니까?',
      text: `${faq.title}을 삭제합니다.`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ed5565',
      confirmButtonText: '삭제',
      closeOnConfirm: false
    }, function () {
      Meteor.call('faqs.delete', {
        faqId: faq._id
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
    if (!this.props.isFaqsReady) {
      return (
        <div />
      );
    }

    return (
      <div>
        <PageHeader title="FAQ" items={this.pageHeaderItems} />
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="ibox">
            <div className="ibox-title">
              <h5>FAQ</h5>
              <div className="ibox-tools">
                <Link to="/faqs/write">
                  <div className="btn btn-primary btn-xs">FAQ 쓰기</div>
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
  const faqsHandle = Meteor.subscribe('faqs');

  return {
    isFaqsReady: faqsHandle.ready(),
    faqs: Faqs.find({}).fetch()
  };
}, _Faqs);
