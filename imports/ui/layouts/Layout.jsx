import React, { Component } from 'react';
import { Route } from 'react-router';

import Navigation from '../components/Navigation/Navigation.jsx';
import DataTable from "../../ui/pages/DataTable/DataTable";
import TopNavigation from '../components/TopNavigation/TopNavigation';

export default class Layout extends Component {
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
        <Navigation match={ this.props.match } />
        <div id="page-wrapper" className="gray-bg">
          <TopNavigation />
          <Route path={ `${this.props.match.url}` } component={ DataTable } />
        </div>
      </div>
    );
  }
}
