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
      name: '앱관리'
    },
    {
      name: '서비스 이용약관'
    }
  ];

  componentDidUpdate() {
    $('.summernote').summernote({
      toolbar: [
        ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
        ['fontsize', ['fontsize', 'height']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['misc', ['undo', 'redo']]
      ]
    });

    $('.summernote').summernote('code', this.props.termsOfService.content);
  }

  onClickSave = () => {
    Meteor.call('termsOfService.update', {
      content: $('.summernote').summernote('code')
    }, (error) => {
      if (error) {
        toastr.error(error.reason);

        return;
      }

      toastr.success('저장되었습니다.');
    });
  };

  render() {
    if (!this.props.isTermsOfServiceReady) {
      return (
        <div />
      );
    }

    return (
      <div>
        <PageHeader title="서비스 이용약관" items={this.pageHeaderItems} />
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row">
            <div className="col-lg-12">
              <div className="ibox float-e-margins">
                <div className="ibox-title">
                  <h5>서비스 이용약관</h5>
                </div>
                <div className="ibox-content no-padding">
                  <div className="summernote" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <button onClick={this.onClickSave} className="btn btn-primary">저장</button>
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
  const termsOfServiceHandle = Meteor.subscribe('termsOfService');

  return {
    isTermsOfServiceReady: termsOfServiceHandle.ready(),
    termsOfService: TermsOfService.findOne({}) || {}
  };
}, _TermsOfService);
