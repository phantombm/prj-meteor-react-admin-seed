import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';

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
    },
    {
      name: 'is visible',
      key: 'isVisible'
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

  onChangeChecked = (checkedIds) => {
    this.setState({
      checkedIds: checkedIds
    });
  };

  onClickHidingBrand = () => {
    Meteor.call('brands.setIsVisible', {
      ids: this.state.checkedIds,
      isVisible: false
    }, (error) => {
      if (error) {
        toastr.error(error.reason);
      }
    })
  };

  onClickShowingBrand = () => {
    Meteor.call('brands.setIsVisible', {
      ids: this.state.checkedIds,
      isVisible: true
    }, (error) => {
      if (error) {
        toastr.error(error.reason);
      }
    })
  };

  onClickDeletingBrand = () => {
    Meteor.call('brands.delete', {
      ids: this.state.checkedIds
    }, (error) => {
      if (error) {
        toastr.error(error.reason);
      }
    })
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

    const brands = _.cloneDeep(this.props.brands);

    brands.map((brand) => {
      brand.createdAt = moment(brand.createdAt).format('YYYY-MM-DD');

      brand.isVisible = brand.isVisible == true ? '노출' : '숨김';
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
                  <DataTable data={brands} name="partners" fields={this.fields} onChangeChecked={this.onChangeChecked} />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <button onClick={this.onClickHidingBrand} className="btn btn-primary" style={{ marginLeft: 10 }}>숨기기</button>
              <button onClick={this.onClickShowingBrand} className="btn btn-primary" style={{ marginLeft: 10 }}>보이기</button>
              <button onClick={this.onClickDeletingBrand} className="btn btn-danger" style={{ marginLeft: 10 }}>삭제</button>
              <button onClick={this.onClickAddingBrand} className="btn btn-primary pull-right">추가</button>
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
