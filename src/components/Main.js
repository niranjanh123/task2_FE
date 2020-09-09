import React, { Component } from "react";
import "./Main.css";
import { Link } from "react-router-dom";
import axios from 'axios'
import Profile from "./Sub_Components/Profile";
import { connect } from "react-redux";

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      password: this.props.password,
    };
  }
  textStyle = {
    color: "black",
  };

  deleteUser = () => {
    axios
      .delete(`http://localhost:9000/sign-up//${this.props.email}/delete`)
      .then((res) => {
        const { status, data } = res;
        const { msg, user } = data;
        console.log(`status: ${status}, msg: ${msg}, user: ${user.email}`);
      });
  };
  render() {
    return (
      <div id="main_container">
        <header>
          <h2>Welcome to the Homepage </h2>
        </header>
        <div id="prof">
          <Profile></Profile>
        </div>
        <div id="navBar">
          <ul id="nav_list">
            <li>Profile</li>
            <hr />
            <Link to="/check" style={this.textStyle}>
              <li>Check</li>
            </Link>
            <hr />
            <Link to="/update" style={this.textStyle}>
              <li>Update</li>
            </Link>
            <hr />
            <Link to="/Login" onClick={this.deleteUser} style={this.textStyle}>
              <li>Delete</li>
            </Link>
            <hr />
            <Link to="/logout" style={this.textStyle}>
              <li>Logout</li>
            </Link>
            <hr />
          </ul>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    email: state.email,
  };
};
export default connect(mapStateToProps)(Main);
