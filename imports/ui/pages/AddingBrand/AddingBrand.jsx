import React, { Component } from 'react';

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
    images: []
  };

  onClickUploadingImage = () => {
    this.imageCropperRef.getDataUrl((file) => {
      this.blobToDataUrl(file, (dataUrl) => {
        this.setState((previousState) => {
          previousState.images.push({
            file: file,
            dataUrl: dataUrl
          });

          return {
            images: previousState.images
          };
        });
      });
    });
  };

  renderImages = () => {
    return this.state.images.map((image) => {
      return (
        <img src={image.dataUrl} style={{ width: '300px', height: '150px', marginBottom: '10px' }} />
      );
    });
  };

  blobToDataUrl = (blob, callback) => {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      callback(event.target.result);
    };

    fileReader.readAsDataURL(blob);
  };

  render() {
    return (
      <div>
        <div className="modal inmodal" id="uploadingImage" tabIndex="-1" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content animated bounceInRight">
              <div className="modal-body">
                <ImageCropper ref={(ref) => { this.imageCropperRef = ref; }} aspectRatio={2} />
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
                        <input className="form-control" placeholder="파트너 브랜드의 브랜드 이름을 적어주세요." />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">간단 설명</label>
                      <div className="col-sm-10">
                        <input className="form-control" placeholder="캐치프라이즈 등 브랜드를 표현할 수 있는 간단한 설명을 적어주세요." />
                      </div>
                    </div>
                    <div className="col-sm-2" />
                    <div className="col-sm-10">
                      <button data-toggle="modal" data-target="#uploadingBrandLogoImage" className="btn btn-primary" style={{ marginLeft: '-10px', marginBottom: '10px' }} type="button">브랜드 로고 올리기</button>
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
                        <textarea className="form-control message-input" placeholder="브랜드에 대한 자세한 소개를 적어주세요." id="message" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">전화번호</label>
                      <div className="col-sm-10">
                        <input className="form-control" placeholder="문의를 직접 받을 수 있는 전화번호를 입력해주세요." />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">이메일</label>
                      <div className="col-sm-10">
                        <input className="form-control" placeholder="이메일 주소를 입력해주세요." />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <button onClick={this.onClickAddingBrand} className="btn btn-primary">추가</button>
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
