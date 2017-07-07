import React, { Component } from 'react';

import Navigation from '../components/Navigation/Navigation';

export default class Layout extends Component {
  render() {
    return (
      <div id="wrapper">
        <Navigation match={ this.props.match } />
        <div id="page-wrapper" className="gray-bg">

        </div>
      </div>
    );
  }
}
