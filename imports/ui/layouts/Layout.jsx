import React, { Component } from 'react';
import { Route } from 'react-router';
import PropTypes from 'prop-types';

import Navigation from '../components/Navigation/Navigation';
import Users from "../pages/Users/Users";
import TopNavigation from '../components/TopNavigation/TopNavigation';
import PageHeader from "../components/PageHeader/PageHeader";
import Footer from "../components/Footer/Footer";
import Profile from "../../ui/pages/Profile/Profile";

export default class Layout extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  };

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
        <Navigation match={this.props.match} />
        <div id="page-wrapper" className="gray-bg">
          <TopNavigation />
          <PageHeader />
          <Route exact path="/users" component={Users} />
          <Route exact path="/users/:id" component={Profile} />
          <Footer />
        </div>
      </div>
    );
  }
}
