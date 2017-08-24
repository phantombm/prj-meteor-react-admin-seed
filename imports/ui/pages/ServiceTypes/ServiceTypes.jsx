import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

import DataTable from '../../components/DataTable/DataTable';
import PageHeader from '../../components/PageHeader/PageHeader';
import { ServiceTypes } from '../../../api/serviceTypes/serviceTypes';

class _ServiceTypes extends Component {
  static propTypes = {
    isServiceTypesReady: PropTypes.bool.isRequired,
    serviceTypes: PropTypes.array.isRequired
  };

  state = {
    checkedIds: []
  };

  fields = [
    {
      name: 'name',
      key: 'name'
    }
  ];

  pageHeaderItems = [
    {
      name: '컨텐츠관리'
    },
    {
      name: '서비스 카테고리'
    }
  ];

  onChangeChecked = (checkedIds) => {
    this.setState({
      checkedIds: checkedIds
    });
  };

  render() {
    if (!this.props.isServiceTypesReady) {
      return (
        <div />
      );
    }

    return (
      <div>
        <PageHeader title="서비스 카테고리" items={this.pageHeaderItems} />
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row">
            <div className="col-lg-12">
              <div className="ibox float-e-margins">
                <div className="ibox-title">
                  <h5>서비스 카테고리</h5>
                </div>
                <div className="ibox-content">
                  <DataTable data={this.props.serviceTypes} name="users" fields={this.fields} onChangeChecked={this.onChangeChecked} />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <button className="btn btn-primary">등록</button>
              <button className="btn btn-danger" style={{ marginLeft: '10px' }}>삭제</button>
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
  const serviceTypesHandle = Meteor.subscribe('serviceTypes');

  return {
    isServiceTypesReady: serviceTypesHandle.ready(),
    serviceTypes: ServiceTypes.find({}).fetch()
  };
}, _ServiceTypes);
