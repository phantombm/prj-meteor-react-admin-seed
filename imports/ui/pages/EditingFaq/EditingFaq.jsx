import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

import { Faqs } from '../../../api/faqs/faqs';

import PageHeader from '../../components/PageHeader/PageHeader';

class EditingFaq extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    isFaqsReady: PropTypes.bool.isRequired,
    faq: PropTypes.object.isRequired
  };

  pageHeaderItems = [
    {
      name: '앱관리'
    },
    {
      name: 'FAQ',
      linkTo: '/faqs'
    },
    {
      name: 'FAQ 수정'
    }
  ];

  componentDidMount() {
    if (!this.props.isFaqsReady) {
      return;
    }

    this.initialize();
  }

  componentDidUpdate() {
    if (!this.props.isFaqsReady) {
      return;
    }

    this.initialize();
  }

  initialize = () => {
    $('.title').val(this.props.faq.title);

    $('.order').val(this.props.faq.order);

    $('.summernote').summernote({
      toolbar: [
        ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
        ['fontsize', ['fontsize', 'height']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['misc', ['undo', 'redo']]
      ]
    });

    $('.summernote').summernote('code', this.props.faq.content);
  };

  onClickSave = () => {
    if ($('.title').val() == '') {
      toastr.error('제목을 써주세요.');

      return;
    }

    if ($('.order').val() == '') {
      toastr.error('우선순위를 써주세요.');

      return;
    }

    if ($('.summernote').summernote('code') == '<p><br></p>' || $('.summernote').summernote('code') == '') {
      toastr.error('내용을 써주세요.');

      return;
    }

    Meteor.call('faqs.update', {
      id: this.props.match.params.id,
      title: $('.title').val(),
      content: $('.summernote').summernote('code'),
      order: $('.order').val()
    }, (error) => {
      if (error) {
        toastr.error(error.reason);

        return;
      }

      toastr.success('저장되었습니다.');
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
        <PageHeader title="FAQ 수정" items={this.pageHeaderItems} />
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row">
            <div className="col-lg-12">
              <div className="ibox float-e-margins">
                <div className="form-group">
                  <input className="form-control title" placeholder="제목" />
                </div>
                <div className="form-group">
                  <input className="form-control order" placeholder="우선순위 : 높을 수록 상단에 노출. 소수점 가능. 예) 1, 3, 10, 105.3, ..." />
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

export default createContainer((props) => {
  const faqsHandle = Meteor.subscribe('faqs');

  return {
    isFaqsReady: faqsHandle.ready(),
    faq: Faqs.findOne({
      _id: props.match.params.id
    }) || {}
  };
}, EditingFaq);
