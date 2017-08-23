import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';

import PageHeader from '../../components/PageHeader/PageHeader';

export default class WritingNotice extends Component {
  state = {
    isRedirected: false
  };

  pageHeaderItems = [
    {
      name: '앱관리'
    },
    {
      name: '공지사항',
      linkTo: '/notices'
    },
    {
      name: '공지사항 쓰기'
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

    Meteor.call('notices.insert', {
      title: $('.title').val(),
      content: $('.summernote').summernote('code')
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
        <Redirect to="/notices" />
      );
    }

    return (
      <div>
        <PageHeader title="공지사항 쓰기" items={this.pageHeaderItems} />
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row">
            <div className="col-lg-12">
              <div className="ibox float-e-margins">
                <div className="form-group">
                  <input className="form-control title" placeholder="제목" />
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
