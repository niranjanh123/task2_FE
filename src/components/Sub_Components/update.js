import React, { Component } from "react";
import './update.css'
import { MdPerson } from "react-icons/md";
import { connect } from "react-redux";
import axios from "axios";
import store from '../Redux/store'
import { userUpdated, showStatus } from "../Redux/actionCreators";

export class update extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       email:this.props.email,
       password:this.props.password
    }
  }
  onChange = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }
  onSubmit = (e) => {
    e.preventDefault();

    const updateUser = {
      email: this.state.email,
      password: this.state.password,
    };

    // api call
    axios
      .put("http://localhost:9000/sign-up/update-user", updateUser)
      .then((res) => {
        const { status, data } = res;
        const { msg, user } = data;
        //console.log(`status: ${status}, msg: ${msg}`);
        store.dispatch(showStatus("success", msg));
        store.dispatch(userUpdated(user.email, user.password));
      })
      .catch((err) => {
        const { status, data } = err.response;
        store.dispatch(showStatus("warning", data.msg));
        //console.log(`status: ${status}, msg: ${data.msg}`);
      });
  };
  render() {
    return (
      <div>
        <div>
          <h1>Update Profile</h1>
          <div className="update_user-card">
                <MdPerson size='3rem'/>
                <br/>
                <form onSubmit={this.onSubmit}>
                <label className='update_name'>Mail</label>
                <input type='email'  name='email' placeholder={this.props.email} readOnly onChange={this.onChange}></input>
                <label className='update_pass'>Password</label>
                <input type='text' name='password' placeholder={this.props.password} onChange={this.onChange}></input>
                <button type='submit' className='update_button'>Update</button>
                </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.email,
    password: state.password,
  };
};

export default connect(mapStateToProps)(update);
