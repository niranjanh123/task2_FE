import React, { Component } from "react";
import "./Profile.css";
export class Profile extends Component {
  state={
    user:'',
    name:''
  }
  

  componentDidMount(){
    const user = localStorage.getItem("user");
    const name = localStorage.getItem("name");
    this.setState({
      user:user,
      name:name
    })
  }
  render() {
    return (
      <div id="profile_container">
        <h1>Profile</h1>
        <h3>Hello {this.state.user}</h3>
      </div>
    );
  }
}

export default Profile;
