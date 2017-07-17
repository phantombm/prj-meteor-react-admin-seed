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
        key: 'email'
      },
      {
        title: 'CP',
        key: 'cellPhoneNumber'
      }
    ]
  };

  renderTableHead = () => {
    return (
      this.props.fields.map((field) => {
        <th>{ field.title }</th>
      })
    );
  };

  renderTableBody = () => {
    return (
      this.props.users.map((user) => {
        <th></th>
      })
    );
  };

  render() {
    console.log(this.props.users);

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
                      <tr className="gradeX">
                        <td>Trident</td>
                        <td>Internet
                          Explorer 4.0
                        </td>
                        <td>Win 95+</td>
                        <td className="center">4</td>
                        <td className="center">X</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Rendering engine</th>
                        <th>Browser</th>
                        <th>Platform(s)</th>
                        <th>Engine version</th>
                        <th>CSS grade</th>
                      </tr>
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
