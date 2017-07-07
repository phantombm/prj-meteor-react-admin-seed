import React, { Component } from 'react';

import './Hello.less';

export default class Hello extends Component {
  state = {
    counter: 0
  };

  onClick = () => {
    this.setState((previousState) => {
      return {
        counter: previousState.counter + 1
      };
    });
  };

  render() {
    return (
      <div id="hello">
        <button onClick={ this.onClick }>Click Me</button>
        <p>You've pressed the button { this.state.counter } times.</p>
      </div>
    );
  }
}
