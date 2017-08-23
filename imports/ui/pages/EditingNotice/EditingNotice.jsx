import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

import { Notices } from '../../../api/notices/notices';

import PageHeader from '../../components/PageHeader/PageHeader';

class EditingNotice extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    isNoticesReady: PropTypes.bool.isRequired,
    notice: PropTypes.object.isRequired
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
      name: '공지사항 수정'
    }
  ];

  componentDidMount() {
    if (!this.props.isNoticesReady) {
      return;
    }

    this.initialize();
  }

  componentDidUpdate() {
    if (!this.props.isNoticesReady) {
      return;
    }

    this.initialize();
  }

  initialize = () => {
    $('.title').val(this.props.notice.title);

    $('.summernote').summernote({
      toolbar: [
        ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
        ['fontsize', ['fontsize', 'height']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['misc', ['undo', 'redo']]
      ]
    });

    $('.summernote').summernote('code', this.props.notice.content);
  };

  onClickSave = () => {
    if ($('.title').val() == '') {
      toastr.error('제목을 써주세요.');

      return;
    }

    Meteor.call('notices.update', {
      id: this.props.match.params.id,
      title: $('.title').val(),
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
    if (!this.props.isNoticesReady) {
      return (
        <div />
      );
    }

    return (
      <div>
        <PageHeader title="공지사항 수정" items={this.pageHeaderItems} />
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
  const noticesHandle = Meteor.subscribe('notices');

  return {
    isNoticesReady: noticesHandle.ready(),
    notice: Notices.findOne({
      _id: props.match.params.id
    }) || {}
  };
}, EditingNotice);
