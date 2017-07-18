import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Navigation extends Component {
  static propTyes = {
    items: PropTypes.array
  };

  static defaultProps = {
    items: [
      {
        title: '대쉬보드',
        url: '/dashboard',
        icon: 'fa-bar-chart-o',
        subItems: []
      },
      {
        title: '모니터링',
        url: '#',
        icon: 'fa-desktop',
        subItems: [
          {
            title: '채팅상담',
            url: '/chatRooms'
          },
          {
            title: '채팅관리',
            url: '/chatManagement'
          },
          {
            title: '리뷰관리',
            url: '/reviewManagement'
          }
        ]
      },
      {
        title: '메뉴관리',
        url: '#',
        icon: 'fa-file-text',
        subItems: [
          {
            title: '공지관리',
            url: '/notices'
          },
          {
            title: 'FAQ 관리',
            url: '/faqs'
          },
          {
            title: '약관관리',
            url: '/terms'
          }
        ]
      },
      {
        title: '회원관리',
        url: '#',
        icon: 'fa-user',
        subItems: [
          {
            title: '쌤관리',
            url: '/ssams'
          },
          {
            title: '고객관리',
            url: '/users'
          }
        ]
      },
      {
        title: '컨텐츠관리',
        url: '#',
        icon: 'fa-cog',
        subItems: [
          {
            title: '상품',
            url: '/goods'
          },
          {
            title: '포트폴리오',
            url: '/portfoilos'
          }
        ]
      },
      {
        title: '정산관리',
        url: '#',
        icon: 'fa-credit-card',
        subItems: [
          {
            title: '판매내역',
            url: '/sales'
          },
          {
            title: '정산내역',
            url: '/balancedMoney'
          }
        ]
      },
      {
        title: '마케팅',
        url: '#',
        icon: 'fa-bell',
        subItems: [
          {
            title: '이벤트',
            url: '/events'
          },
          {
            title: '푸쉬알람',
            url: '/pushs'
          }
        ]
      }
    ]
  };

  componentDidMount() {
    $('#side-menu').metisMenu();
  }

  renderItems = () => {
    return this.props.items.map((item, index) => {
      let isItemActive = false;

      let regExp = new RegExp(item.url);

      if (regExp.test(this.props.match.url)) {
        isItemActive = true;
      }

      _.each(item.subItems, (subItem) => {
        let regExp = new RegExp(subItem.url);

        if (regExp.test(this.props.match.url)) {
          isItemActive = true;
        }
      });

      return (
        <li key={ index } className={ isItemActive && 'active' }>
          <Link to={ item.url }><i className={ 'fa ' + item.icon }></i><span className="nav-label" data-i18n="nav.dashboard">{ item.title }</span>{ item.subItems.length != 0 && <span className="fa arrow"></span> }</Link>
          { item.subItems.length != 0 && (<ul className={ 'nav nav-second-level collapse ' + (isItemActive && 'in') }>
            { this.renderSubItems(item) }
          </ul>) }
        </li>
      );
    });
  };

  renderSubItems = (item) => {
    return item.subItems.map((subItem, index) => {
      let isSubItemActive = false;

      let regExp = new RegExp(subItem.url);

      if (regExp.test(this.props.match.url)) {
        isSubItemActive = true;
      }

      return (
        <li key={ index } className={ isSubItemActive && 'active' }><Link to={ subItem.url }>{ subItem.title }</Link></li>
      );
    });
  };

  render() {
    return (
      <nav className="navbar-default navbar-static-side" role="navigation">
        <div className="sidebar-collapse">
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
