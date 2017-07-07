import React, { Component } from 'react';

import Info from '../../components/Info/Info';
import Hello from '../../components/Hello/Hello';

export default class Main extends Component {
  render() {
    return (
      <div id="main">
        <Hello />
        <Info />
      </div>
    );
  }
}
