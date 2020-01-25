import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import FacebookLogin from "../social/FacebookLogin/";
import GoogleLogin from "../social/GoogleLogin/";
import Layout from "../../layout";

// Helpers
import { emailValidation } from "../../helpers";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      type: "show",
      email: "",
      password: "",
      isSubmit: false,
      errors: {},
      isShowPassword: false
    };
  }

  showHide = e => {
    this.setState({
      isShowPassword: !this.state.isShowPassword
    });
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    if (this.state.isSubmit) {
      if (e.target.id === "email") {
        this.validate_email(e.target.value);
      } else {
        this.validate_password();
      }
    }
  };

  onEmailInput = e => {
    this.setState({ email: e.target.value });
    setTimeout(this.validate_email(e.target.value), 1000);
  };

  validate_email(value) {
    if (!emailValidation(value)) {
      this.setState({
        errors: { ...this.state.errors, email: true }
      });
    } else {
      this.setState({ errors: { ...this.state.errors, email: false } });
    }
  }

  validate_password() {
    var regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
    if (!regExp.test(this.state.password)) {
      this.setState({ errors: { ...this.state.errors, password: true } });
    } else {
      this.setState({ errors: { ...this.state.errors, password: false } });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    this.setState({ isSubmit: true }, () => {
      this.validate_email(this.state.email);
      this.validate_password();
    });
    // const userData = {
    //   email: this.state.email,
    //   password: this.state.password
    // };

    // this.props.loginUser(userData);
  };

  render() {
    const { errors, isSubmit, isShowPassword } = this.state;
    console.log(" isSubmit && errors.email ", isSubmit, errors.email);
    return (
      <Layout>
        <Fragment>
          <h3 className="form-title">Log in to Gelato</h3>
          <div className="space30" />
          <div className="form-container">
            <GoogleLogin button_text={"Log In with Google"} />
            <div className="space10" />
            <FacebookLogin button_text={"Log In with Facebook"} />

            <div className="form-hr-or">
              <div className="hr-container">
                <hr />
              </div>
              <div className="or-letter">or</div>
              <div className="hr-container">
                <hr />
              </div>
            </div>

            <form onSubmit={this.onSubmit}>
              <div
                className={classnames("input-field custom-field", {
                  invalid: (isSubmit && errors.email) || errors.emailnotfound
                })}
              >
                <input
                  onChange={this.onChange}
                  onInput={this.onEmailInput}
                  value={this.state.email}
                  id="email"
                  type="email"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="space20" />
              <div
                className={classnames("input-field custom-field", {
                  invalid:
                    isSubmit &&
                    (errors.email ||
                      errors.password ||
                      errors.passwordincorrect ||
                      errors.emailnotfound)
                })}
              >
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  id="password"
                  type={isShowPassword ? "text" : "password"}
                />
                {isShowPassword ? (
                  <div className="showPassword-icon" onClick={this.showHide}>
                    <img src="/images/icons/showPassword.svg" />
                  </div>
                ) : (
                  <div className="showPassword-icon" onClick={this.showHide}>
                    <img src="/images/icons/hidePassword.svg" />
                  </div>
                )}
                <label htmlFor="password">Password</label>
              </div>
            </form>
            <div className="form-error-text">
              {isSubmit &&
              (errors.email ||
                errors.password ||
                errors.passwordincorrect ||
                errors.emailnotfound)
                ? "Incorrect Email or Password"
                : ""}
            </div>
            <button
              type="submit"
              className="register-login-button"
              onClick={this.onSubmit}
            >
              Log in with Email
            </button>

            <div className=" privay-term-text">
              Protected by reCAPTCHA and Google's{" "}
              <span className="privacy-term-underline">Privacy.</span> &{" "}
              <span className="privacy-term-underline">Terms.</span>
            </div>
            <div className="space20" />
            <div className="space20" />

            <div className=" not-member-container">
              <div>
                <span className="not-member">Not a member?</span>
                <Link
                  to="/register"
                  style={{
                    color: "#78AEFF",
                    textDecoration: "underline",
                    marginLeft: "0.5em",
                    fontSize: "13px",
                    fontWeight: "500"
                  }}
                >
                  Join Gelato
                </Link>
              </div>
              <Link
                to="/"
                style={{
                  color: "#78AEFF",
                  textDecoration: "underline",
                  marginLeft: "0.5em",
                  fontSize: "13px",
                  fontWeight: "500"
                }}
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </Fragment>
      </Layout>
    );
  }
}

export default Login;
