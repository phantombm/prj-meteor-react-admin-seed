import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ImageCropper extends Component {
  static propTypes = {
    name: PropTypes.string,
    aspectRatio: PropTypes.number,
    width: PropTypes.number
  };

  static defaultProps = {
    name: 'image-cropper',
    aspectRatio: 1,
    width: 512
  };

  componentDidMount() {
    const $image = $(`.image-crop.${this.props.name} > img`);

    this.$image = $image;

    $image.cropper({
      aspectRatio: this.props.aspectRatio,
      zoomable: false,
      restore: true
    });

    const $inputImage = $(`#inputImage.${this.props.name}`);

    if (window.FileReader) {
      $inputImage.change(function() {
        const fileReader = new FileReader();

        const files = this.files;

        let file;

        if (!files.length) {
          return;
        }

        file = files[0];

        if (/^image\/\w+$/.test(file.type)) {
          fileReader.readAsDataURL(file);

          fileReader.onload = function() {
            $inputImage.val('');

            $image.cropper('reset', true).cropper('replace', this.result);
          };
        } else {
          toastr.error('이미지 파일을 선택해주세요.');
        }
      });
    } else {
      $inputImage.addClass("hide");
    }

    this.getDataUrl();
  }

  getDataUrl = (callback) => {
    this.resizeImage(this.$image.cropper('getDataURL'), this.props.width, this.props.width / this.props.aspectRatio, (dataUrl) => {
      this.resizeImage(this.$image.cropper('getDataURL'), this.props.width / 2, this.props.width / this.props.aspectRatio / 2, (halfDataUrl) => {
        callback(this.convertDataUrlToBlob(dataUrl), this.convertDataUrlToBlob(halfDataUrl));
      });
    });
  };

  convertDataUrlToBlob = (dataUrl) => {
    var arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
  };

  resizeImage = (dataUrl, width, height, callback) => {
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement('canvas');

      canvas.width = width;
      canvas.height = height;

      canvas.getContext("2d").drawImage(image, 0, 0, width, height);

      callback(canvas.toDataURL());
    };

    image.src = dataUrl;
  };

  render() {
    return (
      <div className="ibox float-e-margins">
        <div className="ibox-content">
          <div className={`image-crop ${this.props.name}`}>
            <img src="/img/p3.jpg" />
          </div>
          <label className="btn btn-primary" style={{ marginTop: '10px' }}>
            <input type="file" accept="image/*" name="file" id="inputImage" className={`hide ${this.props.name}`} />
            이미지 업로드
          </label>
        </div>
      </div>
    );
  }
}
