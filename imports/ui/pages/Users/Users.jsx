import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

class Users extends Component {
  static propTypes = {
    fields: PropTypes.array
  };

  static defaultProps = {
    fields: [
      {
        title: 'user id',
        key: '_id'
      },
      {
        title: 'email',
        key: 'emails.0.address'
      },
      {
        title: 'CP',
        key: 'profile.cellPhoneNumber'
      }
    ]
  };

  componentDidUpdate() {
    if (this.props.users.length != 0) {
      $('.dataTables-example').DataTable({
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
          { extend: 'copy'},
          {extend: 'csv'},
          {extend: 'excel', title: 'ExampleFile'},
          {extend: 'pdf', title: 'ExampleFile'},

          {extend: 'print',
            customize: function (win){
              $(win.document.body).addClass('white-bg');
              $(win.document.body).css('font-size', '10px');

              $(win.document.body).find('table')
                .addClass('compact')
                .css('font-size', 'inherit');
            }
          }
        ]
      });
    }
  }

  renderTableHead = () => {
    return (
      this.props.fields.map((field) => {
        return (
          <th>{ field.title }</th>
        );
      })
    );
  };

  renderTableBody = () => {
    return (
      this.props.users.map((user) => {
        return (
          <tr className="gradeX">
            { this.renderTableBodyTd(user) }
          </tr>
        );
      })
    );
  };

  renderTableBodyTd = (user) => {
    return (
      this.props.fields.map((field) => {
        const keys = field.key.split('.');

        if (keys.length == 1) {
          return (
            <td>{ user[keys[0]] }</td>
          );
        }
        else if (keys.length == 2) {
          return (
            <td>{ user[keys[0]][keys[1]] }</td>
          );
        }
        else if (keys.length == 3) {
          return (
            <td>{ user[keys[0]][keys[1]][keys[2]] }</td>
          );
        }
      })
    );
  };

  render() {
    return (
      <div className="wrapper wrapper-content animated fadeInRight">
        <div className="row">
          <div className="col-lg-12">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5>고객관리</h5>
              </div>
              <div className="ibox-content">
                <div className="table-responsive">
                  <table className="table table-striped table-bordered table-hover dataTables-example" >
                    <thead>
                      <tr>{ this.renderTableHead() }</tr>
                    </thead>
                    <tbody>
                      { this.renderTableBody() }
                      <tr className="gradeA">
                        <td>Trident</td>
                        <td className="center">5.5</td>
                        <td className="center">A</td>
                      </tr>
                      <tr className="gradeA">
                        <td>Trident</td>
                        <td className="center">5.5</td>
                        <td className="center">A</td>
                      </tr>
                      <tr className="gradeA">
                        <td>Trident</td>
                        <td className="center">5.5</td>
                        <td className="center">A</td>
                      </tr>
                      <tr className="gradeA">
                        <td>Trident</td>
                        <td className="center">5.5</td>
                        <td className="center">A</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>{ this.renderTableHead() }</tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('users.all');

  return {
    users: Meteor.users.find({}).fetch()
  };
}, Users);