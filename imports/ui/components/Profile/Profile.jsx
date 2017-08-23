import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default class Profile extends Component {
  static propTypes = {
    profile: PropTypes.object,
    statistics: PropTypes.array,
    graph: PropTypes.object,
    basicInformation: PropTypes.array
  };

  static defaultProps = {
    profile: {
      name: 'james',
      signInType: 'facebook',
      roles: ['관리자', '쌤', '사용자'],
      introduction: '안녕하세요 ㅎㅎㅎ. 잘하는 쌤입니다.',
      imageUrl: 'http://file2.instiz.net/data/file2/2016/01/05/8/1/6/816140efeb4b5edb67df6532837ad1e1.jpg'
    },
    statistics: [
      {
        firstItem: {
          name: '서비스 횟수',
          value: 30
        },
        secondItem: {
          name: '서비스 총금액',
          value: 100000000
        }
      },
      {
        firstItem: {
          name: '서비스 진행중',
          value: 30
        },
        secondItem: {
          name: '리뷰',
          value: 30
        }
      }
    ],
    graph: {
      name: '최근 서비스 금액',
      value: 400000,
      values: [10000, 300000, 20000, 100000, 300000]
    },
    basicInformation: [
      {
        name: '이름',
        value: 'jame kang'
      },
      {
        name: '로그인 방법',
        value: 'facebook'
      },
      {
        name: 'email',
        value: 'asdf@asdf.com'
      },
      {
        name: '휴대폰 번호',
        value: '01028331122'
      },
      {
        name: '가입일',
        value: '1923.23.23'
      },
      {
        name: '이름',
        value: 'jame kang'
      }
    ]
  };

  componentDidMount() {
    $('#sparkline1').sparkline(this.props.graph.values, {
      type: 'line',
      width: '100%',
      height: '50',
      lineColor: '#1ab394',
      fillColor: 'transparent'
    });
  }

  renderStatistics = () => {
    return this.props.statistics.map((item, index) => {
      return (
        <tr key={index}>
          <td><strong>{ item.firstItem.value }</strong> { item.firstItem.name }</td>
          <td><strong>{ item.secondItem.value }</strong> { item.secondItem.name }</td>
        </tr>
      );
    });
  };

  renderBasicInformation = () => {
    return this.props.basicInformation.map((item) => {
      return (
        <div>
          <strong>{ item.name }</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ item.value }
        </div>
      );
    });
  };

  render() {
    let roles = _.reduce(this.props.profile.roles, (roles, role) => {
      return `${roles} / ${role}`;
    }, '') ;

    roles = roles.replace(' / ', '');

    return (
      <div className="wrapper wrapper-content animated fadeInRight">
        <div className="row m-b-lg m-t-lg">
          <div className="col-md-6">
            <div className="profile-image">
              <img src={this.props.profile.imageUrl} className="img-circle circle-border m-b-md" alt="profile" />
            </div>
            <div className="profile-info">
              <div>
                <h2 className="no-margins">{ this.props.profile.name }</h2>
                <h4>{ roles }</h4>
                <small>{ this.props.profile.introduction }</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <table className="table small m-b-xs">
              <tbody>
                { this.renderStatistics() }
              </tbody>
            </table>
          </div>
          <div className="col-md-3">
            <small>{ this.props.graph.name }</small>
            <h2 className="no-margins">{ this.props.graph.value }</h2>
            <div id="sparkline1" />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="ibox">
              <div className="ibox-content">
                <h3>기본 정보</h3>
                <p className="small font-bold">
                  <span><i className="fa fa-circle text-navy" /> Online status</span>
                </p>
                <p className="small">
                  { this.renderBasicInformation() }
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-8" />
        </div>
      </div>
    );
  }
}
