import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';

import PageHeader from '../../components/PageHeader/PageHeader';

export default class WritingFaq extends Component {
  state = {
    isRedirected: false
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
      name: 'FAQ 쓰기'
    }
  ];

  componentDidMount() {
    $('.summernote').summernote({
      toolbar: [
        ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
        ['fontsize', ['fontsize', 'height']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['misc', ['undo', 'redo']]
      ]
    });
  }

  onClickWriting = () => {
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

    Meteor.call('faqs.insert', {
      title: $('.title').val(),
      content: $('.summernote').summernote('code'),
      order: $('.order').val()
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
        <Redirect to="/faqs" />
      );
    }

    return (
      <div>
        <PageHeader title="FAQ 쓰기" items={this.pageHeaderItems} />
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
              <button onClick={this.onClickWriting} className="btn btn-primary">쓰기</button>
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
