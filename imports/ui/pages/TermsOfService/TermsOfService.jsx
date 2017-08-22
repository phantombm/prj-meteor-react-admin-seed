import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { TermsOfService } from '../../../api/termsOfService/termsOfService';

import PageHeader from '../../components/PageHeader/PageHeader';

class _TermsOfService extends Component {
  static propTypes = {
    isTermsOfServiceReady: PropTypes.bool.isRequired,
    termsOfService: PropTypes.object.isRequired
  };


  pageHeaderItems = [
    {
      name: '메뉴관리'
    },
    {
      name: '약관관리'
    }
  ];

  render() {
    if (!this.props.isTermsOfServiceReady) {
      return (
        <div />
      );
    }

    return (
      <div>
        <PageHeader title="고객관리" items={this.pageHeaderItems} />
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row">
            <div className="col-lg-10 col-lg-offset-1">
              <div className="ibox">
                <div className="ibox-content">
                  <div className="text-center article-title">
                    <h1>{ this.props.termsOfService.title || '서비스 이용약관' }</h1>
                  </div>
                  <p>{ this.props.termsOfService.content || '서비스 이용약관' }</p>
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
  const termsOfServiceHandle = Meteor.subscribe('termsOfService');

  return {
    isTermsOfServiceReady: termsOfServiceHandle.ready(),
    termsOfService: TermsOfService.findOne({}) || {}
  };
}, _TermsOfService);
