import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class PageHeader extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
  };

  renderItems = () => {
    return this.props.items.map((item, index) => {
      if (index != this.props.items.length - 1) {
        if (!item.linkTo) {
          return (
            <li key={index}>{ item.name }</li>
          );
        }
        else {
          return (
            <li key={index}><Link to={item.linkTo}>{ item.name }</Link></li>
          );
        }
      }
      else {
        return (
          <li key={index} className="active"><strong>{ item.name }</strong></li>
        );
      }
    });
  };

  render() {
    return (
      <div className="row wrapper border-bottom white-bg page-heading">
        <div className="col-lg-12">
          <h2>{this.props.title}</h2>
          <ol className="breadcrumb">
            { this.renderItems() }
          </ol>
        </div>
      </div>
    );
  }
}
