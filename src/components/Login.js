import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import store from './Redux/store'
import {userStored} from './Redux/actionCreators'

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

class Login extends Component {
  state = {
    isLoggedin: false,
    user: "",
    persons: [],
  };
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      formErrors: {
        email: "",
        password: "",
      },
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state)) {
      let email = this.state.email;
      let password = this.state.password;
      let user = {
        email: email,
        password: password,
      };
      axios
        .post("http://localhost:9000/sign-up/login", user)
        .then((response) => {
          if (response) {
            if (response.data.user) {
              store.dispatch(userStored(email, password));
              this.setState({
                isLoggedin: true,
                user: email,
              });
            }
            if (response.data.error || response.error) {
              alert(response.data.error, response.error);
            }
          }
        })
        .catch((err) => console.log("Error " + err));
      console.log(`
        --SUBMITTING--
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  componentWillMount() {
    axios.get("http://localhost:9000/").then((res) => {
      if (this.state.isLoggedin) {
        console.log(res.data);
        let persons = res.data;
        console.log(persons);
        this.setState({ persons });
      }
    });
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
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
    if (this.state.isLoggedin) {
      console.log(this.state.user);
      alert("logged in");
      localStorage.setItem("user", this.state.user);
      return <Redirect to="/main" />;
    }
    return (
      <div id="form_container">
        <form id="form" onSubmit={this.handleSubmit}>
          <h2>Login</h2>
          <br />
          <br />
          <label id="label1">Email</label>
          <br />
          <input
            className={formErrors.email.length > 0 ? "error" : null}
            type="email"
            name="email"
            id="mail"
            onChange={this.handleChange}
          />
          {formErrors.email.length > 0 && (
            <span className="errorMessage">{formErrors.email}</span>
          )}
          <br />
          <br />
          <label id="label2">Password</label>
          <br />
          <input
            className={formErrors.password.length > 0 ? "error" : null}
            type="password"
            name="password"
            id="password"
            onChange={this.handleChange}
          />
          {formErrors.password.length > 0 && (
            <span className="errorMessage">{formErrors.password}</span>
          )}
          <br />
          <br />
          <button type="submit" id="login_button">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
