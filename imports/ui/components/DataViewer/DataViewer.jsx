import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import DataTable from '../../components/DataTable/DataTable';
import DateRangePicker from '../../components/DateRangePicker/DateRangePicker';

export default class DataViewer extends Component {
  static propTypes = {
    name: PropTypes.string,
    fields: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    onChangeChecked: PropTypes.func,
    isCheckboxVisible: PropTypes.bool
  };

  static defaultProps = {
    name: 'data-table-viewer',
    onChangeChecked: () => {},
    isCheckboxVisible: true
  };

  state = {
    startDate: moment(),
    endDate: moment(),
    option: 'Not Selected'
  };

  onChangeDate = (startDate, endDate) => {
    this.setState({
      startDate: startDate,
      endDate: endDate
    });
  };

  onChangeOption = (option) => {
    this.setState({
      option: option
    });
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
    let selectOptions = this.props.fields.map((field) => {
      if (!field.isSearchableDate) {
        return null;
      }

      return field.name;
    });

    let data = _.cloneDeep(this.props.data);

    selectOptions = _.compact(selectOptions);

    if (selectOptions.length > 0 && this.state.option != 'Not Selected') {
      const field = _.find(this.props.fields, {
        name: this.state.option
      });

      data = _.filter(data, (data) => {
        const value = this.getValueWithDotNotation(data, field.key);

        return moment(value).format('YYYY-MM-DD') >= this.state.startDate.format('YYYY-MM-DD') && moment(value).format('YYYY-MM-DD') <= this.state.endDate.format('YYYY-MM-DD');
      });
    }

    return (
      <div>
        { selectOptions.length > 0 &&
          <div className="row">
            <div className="col-lg-12">
              <DateRangePicker name={this.props.name} selectOptions={selectOptions} onChangeDate={this.onChangeDate} onChangeOption={this.onChangeOption} />
            </div>
          </div>
        }
        <div className="row">
          <div className="col-lg-12">
            <DataTable name={this.props.name} fields={this.props.fields} data={data} onChangeChecked={this.props.onChangeChecked} isCheckboxVisible={this.props.isCheckboxVisible} />
          </div>
        </div>
      </div>
    );
  }
}
