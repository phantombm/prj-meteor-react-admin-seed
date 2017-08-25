import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash'
import { Metoer } from 'meteor/meteor';

export default class Navigation extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    logo: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
  };

  componentDidMount() {
    $('#side-menu').metisMenu();
  }

  renderItems = () => {
    return this.props.items.map((item, index) => {
      let isItemActive = false;

      const regExp = new RegExp(item.url);

      if (regExp.test(this.props.match.url)) {
        isItemActive = true;
      }

      _.each(item.subItems, (subItem) => {
        const regExp = new RegExp(subItem.url);

        if (regExp.test(this.props.match.url)) {
          isItemActive = true;
        }
      });

      return (
        <li key={index} className={isItemActive && 'active'}>
          <Link to={item.url}><i className={`fa ${item.icon}`} /><span className="nav-label" data-i18n="nav.dashboard">{ item.title }</span>{ item.subItems.length != 0 && <span className="fa arrow" /> }</Link>
          { item.subItems.length != 0 &&
            <ul className={`nav nav-second-level collapse ${isItemActive && 'in'}`}>
              { this.renderSubItems(item) }
            </ul>
          }
        </li>
      );
    });
  };

  renderSubItems = (item) => {
    return item.subItems.map((subItem, index) => {
      let isSubItemActive = false;

      const regExp = new RegExp(subItem.url);

      if (regExp.test(this.props.match.url)) {
        isSubItemActive = true;
      }

      return (
        <li key={index} className={isSubItemActive && 'active'}><Link to={subItem.url}>{ subItem.title }</Link></li>
      );
    });
  };

  onClickSignOut = () => {
    Meteor.logout();
  };

  render() {
    return (
      <nav className="navbar-default navbar-static-side" role="navigation">
        <div className="sidebar-collapse">
          <ul className="nav metismenu" id="side-menu">
            <li className="nav-header">
              <div className="dropdown profile-element">
                <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                  <span className="clear">
                    <span className="block m-t-xs"><strong className="font-bold">{ this.props.user.profile.name }</strong></span>
                    <span className="text-muted text-xs block">{ this.props.user.profile.email } <b className="caret" /></span>
                  </span>
                </a>
                <ul className="dropdown-menu animated fadeInRight m-t-xs">
                  <li><Link to={`/users/${this.props.user._id}`}>Profile</Link></li>
                  <li className="divider" />
                  <li><a href="#" onClick={this.onClickSignOut}>Logout</a></li>
                </ul>
              </div>
              <div className="logo-element">{ this.props.logo }</div>
            </li>
            { this.renderItems() }
          </ul>
        </div>
      </nav>
    );
  }
}
