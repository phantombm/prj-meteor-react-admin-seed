import React, { Component } from 'react';
import { Route } from 'react-router';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';

import Navigation from '../components/Navigation/Navigation';
import TopNavigation from '../components/TopNavigation/TopNavigation';
import Footer from "../components/Footer/Footer";
import Users from "../pages/Users/Users";
import User from "../pages/User/User";
import Ssams from "../pages/Ssams/Ssams";
import Ssam from "../pages/Ssam/Ssam";
import TermsOfService from "../pages/TermsOfService/TermsOfService";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import Notices from "../pages/Notices/Notices";
import WritingNotice from "../pages/WritingNotice/WritingNotice";
import EditingNotice from "../pages/EditingNotice/EditingNotice";
import Faqs from "../pages/Faqs/Faqs";
import WritingFaq from "../pages/WritingFaq/WritingFaq";
import EditingFaq from "../pages/EditingFaq/EditingFaq";
import RemoteNotifications from "../pages/RemoteNotifications/RemoteNotifications";
import SendingRemoteNotification from "../pages/SendingRemoteNotification/SendingRemoteNotification";
import Services from "../pages/Services/Services";
import ServiceTypes from "../pages/ServiceTypes/ServiceTypes";
import Chats from "../pages/Chats/Chats";
import Brands from "../pages/Brands/Brands";
import AddingBrand from "../pages/AddingBrand/AddingBrand";

class Layout extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    isLoggingIn: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
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
          title: '채팅',
          url: '/chats'
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
          title: '쌤',
          url: '/ssams'
        },
        {
          title: '고객',
          url: '/users'
        },
        {
          title: '파트너',
          url: '/brands'
        }
      ]
    },
    {
      title: '컨텐츠관리',
      url: '#',
      icon: 'fa-cog',
      subItems: [
        {
          title: '서비스 카테고리',
          url: '/serviceTypes'
        },
        {
          title: '서비스',
          url: '/services'
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
          url: '/remoteNotifications'
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
    if (this.props.isLoggingIn) {
      return (
        <div />
      );
    }

    if (!this.props.user._id) {
      return (
        <Redirect to="/signIn" />
      );
    }

    return (
      <div id="wrapper">
        <Navigation match={this.props.match} items={this.navigationItems} logo="WB+" user={this.props.user} />
        <div id="page-wrapper" className="gray-bg">
          <TopNavigation />
          <Route exact path="/users" component={Users} />
          <Route exact path="/users/:id" component={User} />
          <Route exact path="/ssams" component={Ssams} />
          <Route exact path="/ssams/:id" component={Ssam} />
          <Route exact path="/termsOfService" component={TermsOfService} />
          <Route exact path="/privacyPolicy" component={PrivacyPolicy} />
          <Route exact path="/notices" component={Notices} />
          <Route exact path="/notices/write" component={WritingNotice} />
          <Route exact path="/notices/edit/:id" component={EditingNotice} />
          <Route exact path="/faqs" component={Faqs} />
          <Route exact path="/faqs/write" component={WritingFaq} />
          <Route exact path="/faqs/edit/:id" component={EditingFaq} />
          <Route exact path="/remoteNotifications" component={RemoteNotifications} />
          <Route exact path="/remoteNotifications/send" component={SendingRemoteNotification} />
          <Route exact path="/services" component={Services} />
          <Route exact path="/serviceTypes" component={ServiceTypes} />
          <Route exact path="/chats" component={Chats} />
          <Route exact path="/brands" component={Brands} />
          <Route exact path="/brands/add" component={AddingBrand} />
          <Footer company="makeupforl" period="2017" />
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    isLoggingIn: Meteor.loggingIn(),
    user: Meteor.user() || {}
  };
}, Layout);
