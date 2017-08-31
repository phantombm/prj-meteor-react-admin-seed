import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';

export default class DataTable extends Component {
  static propTypes = {
    name: PropTypes.string,
    fields: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    onChangeChecked: PropTypes.func,
    isCheckboxVisible: PropTypes.bool
  };

  static defaultProps = {
    name: 'data-table-namespace',
    onChangeChecked: () => {},
    isCheckboxVisible: true
  };

  state = {
    isAllChecked: false,
    checkedIds: []
  };

  componentDidMount() {
    this.initialize();
  }

  componentWillUpdate(nextProps) {
    if (!this.isSameData(this.props.data, nextProps.data)) {
      this.destroy();
    }
  }

  isSameData = (currentData, nextData) => {
    const previousConcatenatedString = _.reduce(currentData, (concatenatedString, data) => {
      return `${concatenatedString}${data}`;
    }, '');

    const nextConcatenatedString = _.reduce(nextData, (concatenatedString, data) => {
      return `${concatenatedString}${data}`;
    }, '');

    if (previousConcatenatedString == nextConcatenatedString) {
      return true;
    }
    else {
      return false;
    }
  };

  componentDidUpdate(previousProps) {
    if (!this.isSameData(previousProps.data, this.props.data)) {
      this.isInitialized = false;

      this.initialize();
    }
  }

  destroy = () => {
    this.dataTable.destroy();
  };

  initialize = () => {
    const visibleColumns = this.props.fields.map((field, index) => {
      if (this.props.isCheckboxVisible) {
        return index + 1;
      }
      else {
        return index;
      }
    });

    this.dataTable = $(`.data-table.${this.props.name}`).DataTable({
      dom: '<"html5buttons"B>lTfgitp',
      buttons: [
        {
          extend: 'excel',
          title: this.props.name,
          exportOptions: {
            columns: visibleColumns
          }
        },
        {
          extend: 'print',
          title: this.props.name,
          customize: (window) => {
            $(window.document.body).addClass('white-bg');

            $(window.document.body).css('font-size', '10px');

            $(window.document.body).find('table').addClass('compact').css('font-size', 'inherit');
          },
          exportOptions: {
            columns: visibleColumns
          }
        }
      ],
      order: [],
      columnDefs: [
        {
          targets: 0,
          orderable: this.props.isCheckboxVisible ? false : true
        }
      ],
      lengthMenu: [
        [10, 25, 50, -1],
        ['10', '25', '50', 'All']
      ],
      drawCallback: () => {
        if (!this.isInitialized) {
          return;
        }

        const isAllChecked = this.isAllChecked(this.state.checkedIds);

        if (!isAllChecked) {
          this.setState({
            isAllChecked: false
          });
        }
        else {
          this.setState({
            isAllChecked: true
          });
        }
      }
    });

    this.isInitialized = true;
  };

  isAllChecked = (checkedIds) => {
    let isAllChecked = true;

    $(this.dataTable.table().body()).children('tr').each(function() {
      if (!isAllChecked) {
        return;
      }

      const id = $(this).attr('data-id');

      const index = _.findIndex(checkedIds, (_id) => {
        return _id == id;
      });

      if (index == -1) {
        isAllChecked = false;
      }
    });

    return isAllChecked;
  };

  onChangeAllChecked = (event) => {
    let checkedIds = _.clone(this.state.checkedIds);

    if (event.target.checked) {
      $(this.dataTable.table().body()).children('tr').each(function() {
        const index = _.findIndex(checkedIds, (id) => {
          return id == $(this).attr('data-id');
        });

        if (index == -1) {
          checkedIds.push($(this).attr('data-id'));
        }
      });
    }
    else {
      $(this.dataTable.table().body()).children('tr').each(function() {
        const index = _.findIndex(checkedIds, (id) => {
          return id == $(this).attr('data-id');
        });

        if (index != -1) {
          checkedIds.splice(index, 1);
        }
      });
    }

    this.setState({
      isAllChecked: event.target.checked,
      checkedIds: checkedIds
    });

    this.props.onChangeChecked(checkedIds);
  };

  onChangeChecked = (event) => {
    const checkedIds = _.clone(this.state.checkedIds);

    if (event.target.checked) {
      checkedIds.push(event.target.name);
    }
    else {
      const index = _.findIndex(checkedIds, (id) => {
        return id == event.target.name;
      });

      checkedIds.splice(index, 1);
    }

    const isAllChecked = this.isAllChecked(checkedIds);

    if (!isAllChecked) {
      this.setState({
        checkedIds: checkedIds,
        isAllChecked: false
      });
    }
    else {
      this.setState({
        checkedIds: checkedIds,
        isAllChecked: true
      });
    }

    this.props.onChangeChecked(checkedIds);
  };

  renderHead = () => {
    return (
      this.props.fields.map((field, index) => {
        return (
          <th key={index} style={{ minWidth: field.minWidth }}>{ field.name }</th>
        );
      })
    );
  };

  renderBody = () => {
    return (
      this.props.data.map((data) => {
        let isChecked = null;

        const index = _.findIndex(this.state.checkedIds, (id) => {
          return id == data._id;
        });

        if (index == -1) {
          isChecked = false;
        }
        else {
          isChecked = true;
        }

        return (
          <tr key={data._id} data-id={data._id} className="gradeX">
            { this.props.isCheckboxVisible &&
              <td>
                <input name={data._id} type="checkbox" checked={isChecked} onChange={this.onChangeChecked} />
              </td>
            }
            { this.renderBodyTd(data) }
          </tr>
        );
      })
    );
  };

  renderBodyTd = (data) => {
    return (
      this.props.fields.map((field, index) => {
        if (!field.linkTo) {
          return (
            <td key={index}>{ this.getValueWithDotNotation(data, field.key) }</td>
          );
        }
        else {
          return (
            <td key={index}><Link to={`${field.linkTo}/${data._id}`}>{ this.getValueWithDotNotation(data, field.key) }</Link></td>
          );
        }
      })
    );
  };

  getValueWithDotNotation = (obejct, dotNotation) => {
    const keys = dotNotation.split('.');

    if (keys.length == 1) {
      return obejct[keys[0]];
    }
    else {
      return this.getValueWithDotNotation(obejct[keys[0]], dotNotation.replace(/[a-zA-Z0-9]+?\./, ''));
    }
  };

  render() {
    return (
      <div className="table-responsive">
        <table className={`table table-striped table-bordered table-hover data-table ${this.props.name}`}>
          <thead>
            <tr>
              { this.props.isCheckboxVisible &&
                <th>
                  <input type="checkbox" checked={this.state.isAllChecked} onChange={this.onChangeAllChecked} />
                </th>
              }
              { this.renderHead() }
            </tr>
          </thead>
          <tbody>
            { this.renderBody() }
          </tbody>
          <tfoot>
            <tr>
              { this.props.isCheckboxVisible &&
                <th />
              }
              { this.renderHead() }
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}
