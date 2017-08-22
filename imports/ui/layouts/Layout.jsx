/* eslint "no-undef": "off" */

import React, { Component } from 'react';
import { Route } from 'react-router';
import PropTypes from 'prop-types';

import Navigation from '../components/Navigation/Navigation';
import TopNavigation from '../components/TopNavigation/TopNavigation';
import Footer from "../components/Footer/Footer";
import Users from "../pages/Users/Users";
import User from "../pages/User/User";
import Ssams from "../pages/Ssams/Ssams";
import Ssam from "../pages/Ssam/Ssam";
import TermsOfService from "../pages/TermsOfService/TermsOfService";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";

export default class Layout extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  };

  navigationItems = [
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
      title: '앱관리',
      url: '#',
      icon: 'fa-file-text',
      subItems: [
        {
          title: '공지사항',
          url: '/notices'
        },
        {
          title: 'FAQ',
          url: '/faqs'
        },
        {
          title: '서비스 이용약관',
          url: '/termsOfService'
        },
        {
          title: '개인정보 취급방칭',
          url: '/privacyPolicy'
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
  ];

  componentDidMount() {
    $(window).bind("resize load", () => {
      if ($(window).width() < 769) {
        $('body').addClass('body-small');
      } else {
        $('body').removeClass('body-small');
      }
    });

    $(window).bind("load resize scroll", () => {
      if(!$('body').hasClass('body-small')) {

        const navbarHeigh = $('nav.navbar-default').height();
        const wrapperHeigh = $('#page-wrapper').height();

        if(navbarHeigh > wrapperHeigh) {
          $('#page-wrapper').css("min-height", navbarHeigh + "px");
        }

        if(navbarHeigh < wrapperHeigh) {
          $('#page-wrapper').css("min-height", $(window).height() + "px");
        }

        if ($('body').hasClass('fixed-nav')) {
          if (navbarHeigh > wrapperHeigh) {
            $('#page-wrapper').css("min-height", navbarHeigh - 60 + "px");
          } else {
            $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
          }
        }
      }
    });
  }

  render() {
    return (
      <div id="wrapper">
        <Navigation match={this.props.match} items={this.navigationItems} logo="WB+" />
        <div id="page-wrapper" className="gray-bg">
          <TopNavigation />
          <Route exact path="/users" component={Users} />
          <Route exact path="/users/:id" component={User} />
          <Route exact path="/ssams" component={Ssams} />
          <Route exact path="/ssams/:id" component={Ssam} />
          <Route exact path="/termsOfService" component={TermsOfService} />
          <Route exact path="/privacyPolicy" component={PrivacyPolicy} />
          <Footer company="makeupforl" period="2017" />
        </div>
      </div>
    );
  }
}
