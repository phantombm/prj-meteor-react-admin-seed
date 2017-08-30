import React, { Component } from 'react';
import { imageUploader } from 'meteor/smartlinkcom:awsuploader';
import { Redirect } from 'react-router-dom';

import PageHeader from '../../components/PageHeader/PageHeader';
import ImageCropper from '../../components/ImageCropper/ImageCropper';

export default class AddingBrands extends Component {
  pageHeaderItems = [
    {
      name: '회원관리'
    },
    {
      name: '파트너',
      linkTo: '/brands'
    },
    {
      name: '파트너 추가'
    }
  ];

  state = {
    images: [],
    isRedirected: false
  };

  onClickUploadingImage = () => {
    this.imageCropperRef.getDataUrl((file) => {
      imageUploader.send(file, (error, downloadUrl) => {
        if (error) {
          toastr.error(error);

          return;
        }

        this.setState((previousState) => {
          previousState.images.push(downloadUrl);

          return {
            images: previousState.images
          };
        });

        $('#uploadingImage').modal('hide');
      });
    });
  };

  onClickUploadingBrandLogoImage = () => {
    this.brandLogoImageCropperRef.getDataUrl((file) => {
      imageUploader.send(file, (error, downloadUrl) => {
        if (error) {
          toastr.error(error);

          return;
        }

        this.setState({
          brandLogoImageUrl: downloadUrl
        });

        $('#uploadingBrandLogoImage').modal('hide');
      });
    });
  };

  renderImages = () => {
    return this.state.images.map((imageUrl, index) => {
      return (
        <div key={index}>
          <img src={imageUrl} style={{ width: '300px', height: '150px', marginBottom: '10px' }} />
        </div>
      );
    });
  };

  onClickAddingBrand = () => {
    Meteor.call('brands.insert', {
      name: this.state.name,
      comment: this.state.comment,
      logoUrl: this.state.brandLogoImageUrl,
      imageUrls: this.state.images,
      detail: this.state.detail,
      serviceDetail: this.state.serviceDetail,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email
    }, (error) => {
      if (error) {
        toastr.error(error.reason);

        return;
      }

      this.setState({
        isRedirected: true
      });
    });
  };

  validate = () => {
    if (!this.state.name) {
      return false;
    }

    if (!this.state.comment) {
      return false;
    }

    if (!this.state.brandLogoImageUrl) {
      return false;
    }

    if (this.state.images.length == 0) {
      return false;
    }

    if (!this.state.detail) {
      return false;
    }

    if (!this.state.serviceDetail) {
      return false;
    }

    if (!this.state.phoneNumber) {
      return false;
    }

    if (!this.state.email) {
      return false;
    }

    return true;
  };

  render() {
    if (this.state.isRedirected) {
      return (
        <Redirect to="/brands" />
      );
    }

    const isValid = this.validate();

    return (
      <div>
        <div className="modal inmodal" id="uploadingBrandLogoImage" tabIndex="-1" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content animated bounceInRight">
              <div className="modal-body">
                <ImageCropper ref={(ref) => { this.brandLogoImageCropperRef = ref; }} aspectRatio={1} name="brandLogoImage" />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={this.onClickUploadingBrandLogoImage}>올리기</button>
                <button className="btn btn-white" data-dismiss="modal">취소</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal inmodal" id="uploadingImage" tabIndex="-1" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content animated bounceInRight">
              <div className="modal-body">
                <ImageCropper ref={(ref) => { this.imageCropperRef = ref; }} aspectRatio={2} name="brandImage" />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={this.onClickUploadingImage}>올리기</button>
                <button className="btn btn-white" data-dismiss="modal">취소</button>
              </div>
            </div>
          </div>
        </div>
        <PageHeader title="파트너 추가" items={this.pageHeaderItems} />
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row">
            <div className="col-lg-12">
              <div className="ibox float-e-margins">
                <div className="ibox-title">
                  <h5>파트너 추가</h5>
                </div>
                <div className="ibox-content">
                  <form className="form-horizontal">
                    <div className="form-group">
                      <label className="col-sm-2 control-label">브랜드명</label>
                      <div className="col-sm-10">
                        <input className="form-control" placeholder="파트너 브랜드의 브랜드 이름을 적어주세요." onChange={(event) => { this.setState({ name: event.target.value }); }} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">간단 설명</label>
                      <div className="col-sm-10">
                        <input className="form-control" placeholder="캐치프라이즈 등 브랜드를 표현할 수 있는 간단한 설명을 적어주세요." onChange={(event) => { this.setState({ comment: event.target.value }); }} />
                      </div>
                    </div>
                    <div className="col-sm-2" />
                    <div className="col-sm-10">
                      <button data-toggle="modal" data-target="#uploadingBrandLogoImage" className="btn btn-primary" style={{ marginLeft: '-10px', marginBottom: '10px' }} type="button">브랜드 로고 올리기</button>
                    </div>
                    <div className="col-sm-2" />
                    <div className="col-sm-10">
                      { this.state.brandLogoImageUrl &&
                        <img src={this.state.brandLogoImageUrl} style={{ width: '300px', height: '300px', marginBottom: '10px' }} />
                      }
                    </div>
                    <div className="col-sm-2" />
                    <div className="col-sm-10">
                      <button data-toggle="modal" data-target="#uploadingImage" className="btn btn-primary" style={{ marginLeft: '-10px', marginBottom: '10px' }} type="button">이미지 올리기</button>
                    </div>
                    <div className="col-sm-2" />
                    <div className="col-sm-10">
                      { this.renderImages() }
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">자세한 설명</label>
                      <div className="col-sm-10">
                        <textarea className="form-control message-input" placeholder="브랜드에 대한 자세한 소개를 적어주세요." onChange={(event) => { this.setState({ detail: event.target.value }); }} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">서비스 내용</label>
                      <div className="col-sm-10">
                        <textarea className="form-control message-input" placeholder="서비스 내용에 대한 자세한 설명을 적어주세요." onChange={(event) => { this.setState({ serviceDetail: event.target.value }); }} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">전화번호</label>
                      <div className="col-sm-10">
                        <input className="form-control" placeholder="문의를 직접 받을 수 있는 전화번호를 입력해주세요." onChange={(event) => { this.setState({ phoneNumber: event.target.value }); }} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">이메일</label>
                      <div className="col-sm-10">
                        <input className="form-control" placeholder="이메일 주소를 입력해주세요." onChange={(event) => { this.setState({ email: event.target.value }); }} />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <button onClick={this.onClickAddingBrand} className="btn btn-primary" disabled={!isValid}>추가</button>
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
