import React, { Component } from 'react';

export default class TopNavigation extends Component {
  onClickMinimalization = (event) => {
    event.preventDefault();

    $('body').toggleClass("mini-navbar");

    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
      $('#side-menu').hide();

      setTimeout(() => {
        $('#side-menu').fadeIn(400);
      }, 200);
    }
    else if ($('body').hasClass('fixed-sidebar')) {
      $('#side-menu').hide();

      setTimeout(() => {
        $('#side-menu').fadeIn(400);
      }, 200);
    }
    else {
      $('#side-menu').removeAttr('style');
    }
  };

  render() {
    return (
      <div className="row border-bottom">
        <nav className="navbar navbar-static-top" role="navigation" style={{ marginBottom: '0' }}>
          <div className="navbar-header">
            <a onClick={ this.onClickMinimalization } id="navbar-minimalize" className="minimalize-styl-2 btn btn-primary" href="#"><i className="fa fa-bars"></i></a>
          </div>
          <ul className="nav navbar-top-links navbar-right">
            <li>
              <a href="#"><i className="fa fa-sign-out"></i> Log out</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
