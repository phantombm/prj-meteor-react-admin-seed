import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Footer extends Component {
  static propTypes = {
    company: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className="footer">
        <div>
          <strong>Copyright</strong> {this.props.company} &copy; {this.props.period}
        </div>
      </div>
    );
  }
}
