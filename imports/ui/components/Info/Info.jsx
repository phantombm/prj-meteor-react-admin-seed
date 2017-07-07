import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import './Info.less';
import { Links } from '../../../api/links/links';

class Info extends Component {
  onSubmit = (event) => {
    event.preventDefault();

    const title = ReactDOM.findDOMNode(this.refs.title).value.trim();
    const url = ReactDOM.findDOMNode(this.refs.url).value.trim();

    Meteor.call('links.insert', title, url, (error) => {
      if (error) {
        console.log(error.error);
      } else {
        ReactDOM.findDOMNode(this.refs.title).value = '';
        ReactDOM.findDOMNode(this.refs.url).value = '';
      }
    });
  };

  renderLinks = () => {
    return this.props.links.map((link) => {
      return (
        <li key={ link._id }>
          <a href={ link.url } target="_blank">{ link.title }</a>
        </li>
      );
    });
  };

  render() {
    return (
      <div id="info">
        <h2>Learn Meteor!</h2>
        <ul>
          <li>
            <form onSubmit={ this.onSubmit }>
              <input
                type="text"
                required
                ref="title"
                placeholder="Title"
              />
              <input
                type="url"
                ref="url"
                required
                placeholder="Url"
              />
              <input
                type="submit"
                value="Add new link"
                onClick={ this.onSubmit }
              />
            </form>
          </li>
          { this.renderLinks() }
        </ul>
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('links.all');

  return {
    links: Links.find().fetch()
  };
}, Info);
