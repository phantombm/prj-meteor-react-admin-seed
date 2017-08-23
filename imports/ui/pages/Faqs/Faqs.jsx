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

    return faqs.map((faqs) => {
      return (
        <tr key={faqs._id}>
          <td className="project-title">
            <Link to={`/faqs/edit/${faqs._id}`}>{ faqs.title }</Link><br />
            <small>{ moment(faqs.createdAt).format('YYYY-MM-DD HH:mm') }</small>
          </td>
          <td className="project-actions">
            <Link to={`/faqs/edit/${faqs._id}`}>
              <div className="btn btn-white btn-sm"><i className="fa fa-pencil" /> 수정</div>
            </Link>
          </td>
        </tr>
      );
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
