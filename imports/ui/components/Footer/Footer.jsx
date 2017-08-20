import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Footer extends Component {
  static propTypes = {
    company: PropTypes.string,
    period: PropTypes.string
  };

  static defaultProps = {
    company: 'smartlink',
    period: '2015-2017'
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
