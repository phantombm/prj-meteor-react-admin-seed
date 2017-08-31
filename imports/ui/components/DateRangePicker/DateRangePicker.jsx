import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class DateRangePicker extends Component {
  static propTypes = {
    name: PropTypes.string,
    selectOptions: PropTypes.array.isRequired,
    onChangeDate: PropTypes.func.isRequired,
    onChangeOption: PropTypes.func.isRequired
  };

  static defaultProps = {
    name: 'date-range-picker'
  };

  state = {
    option: 'Not Selected'
  };

  componentDidMount() {
    $.fn.datepicker.dates['ko'] = {
      days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
      daysShort: ['일', '월', '화', '수', '목', '금', '토'],
      daysMin: ['일', '월', '화', '수', '목', '금', '토'],
      months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      today: '오늘',
      clear: '삭제',
      format: 'yyyy-mm-dd',
      titleFormat: 'yyyy년 mm월'
    };

    $(`.${this.props.name} .input-daterange`).datepicker({
      keyboardNavigation: false,
      forceParse: false,
      autoclose: true,
      language: 'ko'
    }).on('changeDate', () => {
      this.onChangeDate();
    });
  }

  onChangeDate = _.throttle(() => {
    const startDate = $(`.${this.props.name} .start-date`).val();

    const endDate = $(`.${this.props.name} .end-date`).val();

    this.props.onChangeDate(moment(startDate), moment(endDate));
  }, Infinity);

  onChangeOption = (event) => {
    this.setState({
      option: event.target.value
    });

    this.props.onChangeOption(event.target.value);
  };

  renderOptions = () => {
    return this.props.selectOptions.map((option, index) => {
      return (
        <option key={index}>{ option }</option>
      );
    });
  };

  render() {
    let isActive = null;

    if (this.state.option == 'Not Selected') {
      isActive = false;
    }
    else {
      isActive = true;
    }

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <select className="form-control m-b" name="account" style={{ width: '150px' }} onChange={this.onChangeOption}>
          <option>Not Selected</option>
          { this.renderOptions() }
        </select>
        <div className={`form-group ${this.props.name}`} style={{ marginLeft: '10px' }}>
          <div className="input-daterange input-group">
            <input className="input-sm form-control start-date" defaultValue={moment().format('YYYY-MM-DD')} disabled={!isActive} />
            <span className="input-group-addon">to</span>
            <input className="input-sm form-control end-date" defaultValue={moment().format('YYYY-MM-DD')} disabled={!isActive} />
          </div>
        </div>
      </div>
    );
  }
}
