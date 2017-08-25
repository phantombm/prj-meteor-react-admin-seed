import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
  static propTypes = {
    isLoggingIn: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
  };

  state = {
    email: '',
    password: ''
  };

  componentDidMount() {
    $('body').addClass('gray-bg');
  }

  componentWillUnmount() {
    $('body').removeClass('gray-bg');
  }

  onChangeEmail = (event) => {
    this.setState({
      email: event.target.value
    });
  };

  onChangePassword = (event) => {
    this.setState({
      password: event.target.value
    });
  };

  onClickSignIn = () => {
    if (this.state.email == '') {
      toastr.error('이메일을 입력해주세요.');

      return;
    }

    if (this.state.password == '') {
      toastr.error('비밀번호을 입력해주세요.');

      return;
    }

    Meteor.loginWithPassword(this.state.email, this.state.password, (error) => {
      if (error) {
        toastr.error('인증에 실패했습니다.');
      }
    });
  };

  validate = () => {
    if (this.state.email == '') {
      return false;
    }

    if (this.state.password == '') {
      return false;
    }

    return true;
  };

  render() {
    if (this.props.isLoggingIn) {
      return (
        <div />
      );
    }

    if (this.props.user._id) {
      return (
        <Redirect to="/dashboard" />
      );
    }

    const isValid = this.validate();

    return (
      <div className="loginColumns animated fadeInDown">
        <div className="row">
          <div className="col-md-6">
            <h2 className="font-bold">WB+ WHAT A BEAUTY</h2>
            <p>WHAT A BEUATY 관리자 페이지입니다.</p>
            <p>허용된 소유자 또는 관리자만 로그인할 수 있습니다.</p>
            <p>관리자의 임명은 소유자만이 할 수 있습니다.</p>
            <p><small>소유자의 비밀번호 공유는 절대 금지합니다. 소유자의 아이디를 공유하기 보다는 관리자를 임명하시기 바랍니다.</small></p>
          </div>
          <div className="col-md-6">
            <div className="ibox-content">
              <div className="form-group">
                <input type="email" className="form-control" placeholder="Email" required="" onChange={this.onChangeEmail} />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder="Password" required="" onChange={this.onChangePassword} />
              </div>
              <button className={`btn btn-primary block full-width m-b ${ !isValid && 'disabled' }`} onClick={this.onClickSignIn}>Login</button>
              <p className="m-t"><small>whatabeauty &copy; 2017</small></p>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-6">Copyright whatabeauty</div>
          <div className="col-md-6 text-right"><small>© 2017</small></div>
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
}, SignIn);
