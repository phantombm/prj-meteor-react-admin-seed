import React, { Component } from 'react';

export default class Profile extends Component {
  componentDidMount() {
    $("#sparkline1").sparkline([34, 43, 43, 35, 44, 32, 44, 48], {
      type: 'line',
      width: '100%',
      height: '50',
      lineColor: '#1ab394',
      fillColor: "transparent"
    });
  }

  render() {
    return (
      <div className="wrapper wrapper-content animated fadeInRight">
        <div className="row m-b-lg m-t-lg">
          <div className="col-md-6">
            <div className="profile-image">
              <img src="/img/a4.jpg" className="img-circle circle-border m-b-md" alt="profile" />
            </div>
            <div className="profile-info">
              <div className="">
                <div>
                  <h2 className="no-margins">
                    Alex Smith
                  </h2>
                  <h4>Founder of Groupeq</h4>
                  <small>
                    There are many variations of passages of Lorem Ipsum available, but the majority
                    have suffered alteration in some form Ipsum available.
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <table className="table small m-b-xs">
              <tbody>
              <tr>
                <td>
                  <strong>142</strong> Projects
                </td>
                <td>
                  <strong>22</strong> Followers
                </td>
              </tr>
              <tr>
                <td>
                  <strong>61</strong> Comments
                </td>
                <td>
                  <strong>54</strong> Articles
                </td>
              </tr>
              <tr>
                <td>
                  <strong>154</strong> Tags
                </td>
                <td>
                  <strong>32</strong> Friends
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-3">
            <small>Sales in last 24h</small>
            <h2 className="no-margins">206 480</h2>
            <div id="sparkline1"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="ibox">
              <div className="ibox-content">
                <h3>About Alex Smith</h3>
                <p className="small">
                  There are many variations of passages of Lorem Ipsum available, but the majority have
                  suffered alteration in some form, by injected humour, or randomised words which don't.
                  <br/>
                  <br/>
                  If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't
                  anything embarrassing
                </p>
                <p className="small font-bold">
                  <span><i className="fa fa-circle text-navy"></i> Online status</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
