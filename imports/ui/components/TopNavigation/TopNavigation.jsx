import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

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

  onClickSignOut = () => {
    Meteor.logout();
  };

  render() {
    return (
      <div className="row border-bottom">
        <nav className="navbar navbar-static-top" role="navigation" style={{ marginBottom: '0' }}>
          <div className="navbar-header">
            <a onClick={ this.onClickMinimalization } id="navbar-minimalize" className="minimalize-styl-2 btn btn-primary" href="#"><i className="fa fa-bars" /></a>
          </div>
          <ul className="nav navbar-top-links navbar-right">
            <li>
              <a href="#" onClick={this.onClickSignOut}><i className="fa fa-sign-out" /> Logout</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
