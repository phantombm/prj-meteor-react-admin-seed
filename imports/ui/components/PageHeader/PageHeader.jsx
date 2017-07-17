import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PageHeader extends Component {
  static propTyes = {
    title: PropTypes.string,
    category: PropTypes.string
  };

  static defaultProps = {
    title: 'title',
    category: 'category'
  };

  render() {
    return (
      <div className="row wrapper border-bottom white-bg page-heading">
        <div className="col-lg-12">
          <h2>{ this.props.title }</h2>
          <ol className="breadcrumb">
            <li><a href="/">Home</a></li>
            { this.props.hasCategory && <li><a>{ this.props.category }</a></li> }
            <li className="active"><strong>{ this.props.title }</strong></li>
          </ol>
        </div>
      </div>
    );
  }
}
