import React, { Component } from "react";
import axios from "axios";
import Top from "./top";
import { Redirect, Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import './Register.css'
import {  } from "react-icons/fa";
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class Register extends Component {
  state = {
    isRegistered: false,
  };
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        email: "",
        password: "",
      },
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state)) {
      let name = this.state.firstName;
      let email = this.state.email;
      let password = this.state.password;
      let user = {
        name: name,
        email: email,
        password: password,
      };
      axios
        .post("http://localhost:9000/sign-up/register", user)
        .then((response) => {
          if (response.data) {
            this.setState({
              isRegistered: true,
            });//hello
          }
        })
        .catch((err) => console.log("Error " + err));

      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;
    if (this.state.isRegistered) {
      alert("Registration Success");
      alert("Please log in to continue");
      return <Redirect to="/login" />;
    }
    return (
      
      <div id="form_container_reg">
          <Top />
        <form id="form_reg" onSubmit={this.handleSubmit}>
          <h2>Register</h2>
          <br />
          <label id="label1" >Name</label>
          <br />
          <input
            type="text"
            className={formErrors.firstName.length > 0 ? "error" : null}
            id="name"
            name="firstName"
            onChange={this.handleChange}
          />
          {formErrors.firstName.length > 0 && (
            <span className="errorMessage">{formErrors.firstName}</span>
          )}
          
          <br />
          <br />
          <label id="label2">Email</label>
          <br />
          <input
            className={formErrors.email.length > 0 ? "error" : null}
            type="email"
            id="email"
            name="email"
            onChange={this.handleChange}
          />
          {formErrors.email.length > 0 && (
            <span className="errorMessage">{formErrors.email}</span>
          )}
          <br />
          <br />
          <label id="label3">Password</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            className={formErrors.password.length > 0 ? "error" : null}
            onChange={this.handleChange}
          />
          {formErrors.password.length > 0 && (
            <span className="errorMessage">{formErrors.password}</span>
          )}
          <br />
          <br />
          <button type="submit" id="submit_button">
            Submit
          </button>
          <br />
          <br />
          <div id="login-side">
            <label style={this.textStyle}>Do you already have an account?</label>{" "}
            <Link to="/login" style={this.textStyle} id="link">
              Login
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
