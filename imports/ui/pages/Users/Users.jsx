import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Users extends Component {
  static propTypes = {
    fields: PropTypes.array,
    isUsersReady: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired
  };

  static defaultProps = {
    fields: [
      {
        title: 'user _id',
        key: '_id'
      },
      {
        title: 'user name',
        key: 'username'
      },
      {
        title: 'email',
        key: 'emails.0.address'
      },
      {
        title: 'phone number',
        key: 'profile.cellPhoneNumber'
      },
      {
        title: 'purchase number',
        key: 'profile.purchaseNumber'
      },
      {
        title: 'purchase total amount',
        key: 'profile.purchaseAmount'
      }
    ]
  };

  state = {
    checkedList: [],
    isChecked: false
  };

  isInitialized = false;

  componentDidUpdate() {
    if (!this.props.isUsersReady) {
      return;
    }

    if (this.isInitialized) {
      return;
    }

    this.dataTable = $('.dataTables').DataTable({
      dom: '<"html5buttons"B>lTfgitp',
      buttons: [
        { extend: 'copy' },
        { extend: 'csv' },
        { extend: 'excel', title: 'ExampleFile' },
        { extend: 'pdf', title: 'ExampleFile' },
        {
          extend: 'print',
          customize: (win) => {
            $(win.document.body).addClass('white-bg');

            $(win.document.body).css('font-size', '10px');

            $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
          }
        }
      ],
      destroy: true,
      order: [],
      columnDefs: [
        {
          targets: 0,
          orderable: false
        }
      ],
      lengthMenu: [
        [10, 25, 50, -1],
        [10, 25, 50, 'All']
      ],
      drawCallback: () => {
        if (!this.isInitialized) {
          return;
        }

        let checkedList = this.state.checkedList;

        const dataTable = this.dataTable;

        let isAllChecked = true;

        console.log(checkedList);
        console.log(dataTable);
        console.log(isAllChecked);

        $(dataTable.table().body()).children('tr').each(function() {
          if (!isAllChecked) {
            return;
          }

          const userId = $(this).attr('data-user-id');

          const index = _.findIndex(checkedList, (item) => {
            return item == userId;
          });

          if (index == -1) {
            isAllChecked = false;
          }
        });
console.log(isAllChecked);
        if (isAllChecked) {
          this.setState({
            isChecked: true
          });
        }
        else {
          this.setState({
            isChecked: false
          });
        }
      }
    });

    this.isInitialized = true;
  }

  renderTableHead = () => {
    return (
      this.props.fields.map((field, index) => {
        return (
          <th key={index}>{ field.title }</th>
        );
      })
    );
  };

  handleInputChange2 = () => {
    let checkedList = this.state.checkedList;

    const dataTable = this.dataTable;

    let isAllChecked = true;

    $(dataTable.table().body()).children('tr').each(function() {
      if (!isAllChecked) {
        return;
      }

      const userId = $(this).attr('data-user-id');

      const index = _.findIndex(checkedList, (item) => {
        return item == userId;
      });

      if (index == -1) {
        isAllChecked = false;
      }
    });

    if (!isAllChecked) {
      $(dataTable.table().body()).children('tr').each(function() {
        const index = _.findIndex(_.clone(checkedList), (userId) => {
          return userId == $(this).attr('data-user-id');
        });

        if (index == -1) {
          checkedList.push($(this).attr('data-user-id'));
        }
      });

      this.setState({
        isChecked: true
      });
    }
    else {
      $(dataTable.table().body()).children('tr').each(function() {
        const index = _.findIndex(_.clone(checkedList), (userId) => {
          return userId == $(this).attr('data-user-id');
        });

        if (index != -1) {
          checkedList.splice(index, 1);
        }
      });

      this.setState({
        isChecked: false
      });
    }

    this.setState({
      checkedList: checkedList
    });

    // if (!doesExist) {
    //   for (let tr in $(this.dataTable.table().body()).children('tr')) {
    //     const index = _.findIndex(checkedList, (userId) => {
    //       return userId == $(tr).attr('data-user-id');
    //     });
    //
    //     if (index != -1) {
    //       this.checkedList.push($(tr).attr('data-user-id'));
    //     }
    //   }
    // }
    // else {
    //   $(this.dataTable.table().body()).children('tr td input').attr('checked', false);
    //
    //   $(this.dataTable.table().body()).children('tr').each(function() {
    //     const index = _.findIndex(this.checkedList, (userId) => {
    //       return userId == $(this).attr('data-user-id');
    //     });
    //
    //     if (index == -1) {
    //       this.checkedList.splice(index, 1);
    //     }
    //   });
    // }
    //
    // console.log(this.checkedList);
  };

  handleInputChange = (event) => {
    const checkedList = _.clone(this.state.checkedList);

    if (event.target.checked) {
      checkedList.push(event.target.name);
    }
    else {
      const index = _.findIndex(checkedList, (_id) => {
        return _id == event.target.name;
      });

      checkedList.splice(index, 1);
    }

    this.setState({
      checkedList: checkedList
    });

    const dataTable = this.dataTable;

    let isAllChecked = true;

    console.log(checkedList);
    console.log(dataTable);
    console.log(isAllChecked);

    $(dataTable.table().body()).children('tr').each(function() {
      if (!isAllChecked) {
        return;
      }

      const userId = $(this).attr('data-user-id');

      const index = _.findIndex(checkedList, (item) => {
        return item == userId;
      });

      if (index == -1) {
        isAllChecked = false;
      }
    });
    console.log(isAllChecked);
    if (isAllChecked) {
      this.setState({
        isChecked: true
      });
    }
    else {
      this.setState({
        isChecked: false
      });
    }
  };

  onClick = () => {
    console.log('asdfasdf');
  };

  renderTableBody = () => {
    return (
      this.props.users.map((user) => {
        let isChecked = null;

        const index = _.findIndex(this.state.checkedList, (userId) => {
          return userId == user._id;
        });

        if (index != -1) {
          isChecked = true;
        }
        else {
          isChecked = false;
        }

        return (
          <tr key={user._id} data-user-id={user._id} className="gradeX" onClick={this.onClick}>
            <td>
              <input name={user._id} type="checkbox" checked={isChecked} onChange={this.handleInputChange} onClick={(event) => { event.preventDefault(); }} />
            </td>
            { this.renderTableBodyTd(user) }
          </tr>
        );
      })
    );
  };

  renderTableBodyTd = (user) => {
    return (
      this.props.fields.map((field, index) => {
        const keys = field.key.split('.');

        if (keys.length == 1) {
          if (keys[0] == '_id') {
            return (
              <td key={index}><Link to={'/users/' + user[keys[0]]}>{ user[keys[0]] }</Link></td>
            );
          }
          else {
            return (
              <td key={index}>{ user[keys[0]] }</td>
            );
          }
        }
        else if (keys.length == 2) {
          return (
            <td key={index}>{ user[keys[0]][keys[1]] }</td>
          );
        }
        else if (keys.length == 3) {
          return (
            <td key={index}>{ user[keys[0]][keys[1]][keys[2]] }</td>
          );
        }
      })
    );
  };

  render() {
    if (!this.props.isUsersReady) {
      return (
        <div />
      );
    }

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
                  <table className="table table-striped table-bordered table-hover dataTables" >
                    <thead>
                      <tr>
                        <th className="no-sort">
                          <input type="checkbox" checked={this.state.isChecked} onChange={this.handleInputChange2} />
                        </th>
                        { this.renderTableHead() }
                      </tr>
                    </thead>
                    <tbody>
                      { this.renderTableBody() }
                    </tbody>
                    <tfoot>
                      <tr>
                        <th />
                        { this.renderTableHead() }
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
  const usersHandle = Meteor.subscribe('users');

  return {
    isUsersReady: usersHandle.ready(),
    users: Meteor.users.find({}).fetch()
  };
}, Users);
