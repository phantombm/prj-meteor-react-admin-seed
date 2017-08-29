import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Redirect } from 'react-router-dom';

import DataTable from '../../components/DataTable/DataTable';
import PageHeader from '../../components/PageHeader/PageHeader';
import { Brands } from '../../../api/brands/brands';

class _Brands extends Component {
  static propTypes = {
    isBrandsReady: PropTypes.bool.isRequired,
    brands: PropTypes.array.isRequired
  };

  state = {
    checkedIds: [],
    isRedirected: false
  };

  fields = [
    {
      name: 'name',
      key: 'name',
      linkTo: 'brand'
    },
    {
      name: 'email',
      key: 'email'
    },
    {
      name: 'phone number',
      key: 'phoneNumber'
    },
    {
      name: 'phone call count',
      key: 'phoneCallCount'
    },
    {
      name: 'sales amount',
      key: 'salesAmount'
    },
    {
      name: 'created at',
      key: 'createdAt'
    }
  ];

  pageHeaderItems = [
    {
      name: '회원관리'
    },
    {
      name: '파트너'
    }
  ];

  onClickAddingBrand = () => {
    this.setState({
      isRedirected: true
    });
  };

  getPrice = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
  };

  onChangeChecked = (checkedIds) => {
    this.setState({
      checkedIds: checkedIds
    });
  };

  render() {
    if (this.state.isRedirected) {
      return (
        <Redirect to="/brands/add" />
      );
    }

    if (!this.props.isBrandsReady) {
      return (
        <div />
      );
    }

    this.props.brands.map((brand) => {
      brand.createdAt = moment(brand.createdAt).format('YYYY-MM-DD');
    });

    return (
      <div>
        <PageHeader title="파트너" items={this.pageHeaderItems} />
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row">
            <div className="col-lg-12">
              <div className="ibox float-e-margins">
                <div className="ibox-title">
                  <h5>파트너</h5>
                </div>
                <div className="ibox-content">
                  <DataTable data={this.props.brands} name="partners" fields={this.fields} onChangeChecked={this.onChangeChecked} />
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

export default createContainer(() => {
  const brandsHandle = Meteor.subscribe('brands');

  return {
    isBrandsReady: brandsHandle.ready(),
    brands: Brands.find({}).fetch()
  };
}, _Brands);
