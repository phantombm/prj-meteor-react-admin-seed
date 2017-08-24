import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

import DataTable from '../../components/DataTable/DataTable';
import PageHeader from '../../components/PageHeader/PageHeader';
import { Services } from '../../../api/services/services';

class _Services extends Component {
  static propTypes = {
    isServicesReady: PropTypes.bool.isRequired,
    services: PropTypes.array.isRequired
  };

  state = {
    checkedIds: []
  };

  fields = [
    {
      name: 'name',
      key: 'name',
      linkTo: '/services'
    },
    {
      name: 'price',
      key: 'price.amount'
    },
    {
      name: 'duration',
      key: 'duration'
    },
    {
      name: 'order',
      key: 'order'
    }
  ];

  pageHeaderItems = [
    {
      name: '컨텐츠관리'
    },
    {
      name: '서비스'
    }
  ];

  onChangeChecked = (checkedIds) => {
    this.setState({
      checkedIds: checkedIds
    });
  };

  render() {
    if (!this.props.isServicesReady) {
      return (
        <div />
      );
    }

    return (
      <div>
        <PageHeader title="서비스" items={this.pageHeaderItems} />
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row">
            <div className="col-lg-12">
              <div className="ibox float-e-margins">
                <div className="ibox-title">
                  <h5>서비스</h5>
                </div>
                <div className="ibox-content">
                  <DataTable data={this.props.services} name="users" fields={this.fields} onChangeChecked={this.onChangeChecked} />
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
  const servicesHandle = Meteor.subscribe('services');

  return {
    isServicesReady: servicesHandle.ready(),
    services: Services.find({}).fetch()
  };
}, _Services);
