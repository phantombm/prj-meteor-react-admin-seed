import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Navigation.less';

export default class Navigation extends Component {
  static propTyes = {
    items: PropTypes.array
  };

  static defaultProps = {
    items: [
      {
        title: '대쉬보드',
        url: '/asdf',
        icon: 'fa-th-large',
        subItems: []
      },
      {
        title: '테스트2',
        url: '/test2',
        icon: 'fa-th-large',
        subItems: [
          {
            title: '테스트 하위',
            url: '/sub_test'
          },
          {
            title: '테스트 하위2',
            url: '/sub_test2'
          },
          {
            title: '테스트 하위3',
            url: '/sub_test3'
          }
        ]
      },
      {
        title: '테스트3',
        url: '/test3',
        icon: 'fa-th-large',
        subItems: [
          {
            title: '테스트 하위4',
            url: '/sub_test4'
          },
          {
            title: '테스트 하위5',
            url: '/sub_test5'
          },
          {
            title: '테스트 하위6',
            url: '/sub_test6'
          }
        ]
      }
    ]
  };

  componentDidMount() {
    $('#side-menu').metisMenu();
  }

  renderItems = () => {
    return this.props.items.map((item) => {
      return (
        <li key={ item.url }>
          <a href={ item.url }><i className={ 'fa ' + item.icon }></i><span className="nav-label" data-i18n="nav.dashboard">{ item.title }</span>{ item.subItems.length != 0 && <span className="fa arrow"></span> }</a>
          { item.subItems.length != 0 && (<ul className="nav nav-second-level collapse { this.props.match.url == item.url && 'in' }">
            { this.renderSubItems(item) }
          </ul>) }
        </li>
      );
    });
  };

  renderSubItems = (item) => {
    return item.subItems.map((subItem) => {
      return (
        <li key={ subItem.url }><a href={ subItem.url }>{ subItem.title }</a></li>
      );
    });
  };

  render() {
    return (
      <nav className="navbar-default navbar-static-side" role="navigation">
        <div className="sidebar-collapse">
          <a className="close-canvas-menu">
            <i className="fa fa-times"></i>
          </a>
          <ul className="nav metismenu" id="side-menu">
            <li className="nav-header">
              <div className="dropdown profile-element">
                <span>
                  <img alt="image" className="img-circle" src="img/profile_small.jpg" />
                </span>
                <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                  <span className="clear">
                    <span className="block m-t-xs"><strong className="font-bold">David Williams</strong></span>
                    <span className="text-muted text-xs block">Art Director <b className="caret"></b></span>
                  </span>
                </a>
                <ul className="dropdown-menu animated fadeInRight m-t-xs">
                  <li><a href="/profile">Profile</a></li>
                  <li className="divider"></li>
                  <li><a href="/logout">Logout</a></li>
                </ul>
              </div>
              <div className="logo-element">IN+</div>
            </li>
            { this.renderItems() }
          </ul>
        </div>
      </nav>
    );
  }
}
