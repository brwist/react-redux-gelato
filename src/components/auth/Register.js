import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import FacebookLogin from "../social/FacebookLogin/";
import GoogleLogin from "../social/GoogleLogin/";
import Layout from "../../layout";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isSubmit: false,
      errors: {},
      isShowPassword: false,
      // Password regexp
      numberOrsymbol: false,
      upperLowercase: false,
      more8Characters: false
    };
  }

  showHide = e => {
    this.setState({
      isShowPassword: !this.state.isShowPassword
    });
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    if (e.target.id === "email") {
      this.validate_email(e.target.value);
    } else {
      this.validate_password(e.target.value);
    }
  };

  onEmailInput = e => {
    this.setState({ email: e.target.value });
    setTimeout(this.validate_email(), 1000);
  };

  validate_email(email) {
    var regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regExp.test(email)) {
      this.setState({
        errors: { email: "Please enter a valid email address" }
      });
    } else {
      this.setState({ errors: { email: "" } });
    }
  }

  validate_password(password) {
    // Upper and lowercase letters
    const regExp1 = /[A-Z]/;
    const regExp2 = /[a-z]/;
    if (regExp1.test(password) && regExp2.test(password)) {
      this.setState({ upperLowercase: true });
    } else {
      this.setState({ upperLowercase: false });
    }

    // Contains a number or symbol
    const regExp3 = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/0-9]/;
    this.setState({ numberOrsymbol: regExp3.test(password) });

    // More than 8 characters
    this.setState({
      more8Characters: password.length > 7 && password.length < 33
    });
  }

  onSubmit = e => {
    e.preventDefault();
    this.setState({ isSubmit: true }, () => {
      this.validate_email(this.state.email);
      this.validate_password(this.state.password);
    });
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const {
      errors,
      email,
      type,
      isShowPassword,
      isSubmit,
      numberOrsymbol,
      upperLowercase,
      more8Characters
    } = this.state;

    return (
      <Layout>
        <Fragment>
          <h3 className="form-title">Gelato is installed!</h3>
          <p className="form-description">Finish creating your account with:</p>
          <div className="form-container">
            <div className="social-button-wrap">
              <GoogleLogin button_text={"Google"} />
              <FacebookLogin button_text={"Facebook"} />
            </div>

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
                  value={email}
                  error={errors.email}
                  id="email"
                  type="email"
                />
                <label htmlFor="email">Email</label>
              </div>
              {(isSubmit && errors.email) || errors.emailnotfound ? (
                <div className="form-error-text">
                  Please enter a valid email address.
                </div>
              ) : (
                <div className="space20" />
              )}
              <div
                className={classnames("input-field custom-field", {
                  invalid:
                    isSubmit &&
                    (errors.email ||
                      errors.password ||
                      errors.passwordnotfound ||
                      errors.emailnotfound)
                })}
              >
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type={isShowPassword ? "text" : "password"}
                />
                {isShowPassword ? (
                  <div className="showPassword-icon" onClick={this.showHide}>
                    <svg
                      width="23"
                      height="16"
                      viewBox="0 0 23 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.3066 0.274902C6.30664 0.274902 2.03664 3.3849 0.306641 7.7749C2.03664 12.1649 6.30664 15.2749 11.3066 15.2749C16.3066 15.2749 20.5766 12.1649 22.3066 7.7749C20.5766 3.3849 16.3066 0.274902 11.3066 0.274902ZM11.3066 12.7749C8.54664 12.7749 6.30664 10.5349 6.30664 7.7749C6.30664 5.0149 8.54664 2.7749 11.3066 2.7749C14.0666 2.7749 16.3066 5.0149 16.3066 7.7749C16.3066 10.5349 14.0666 12.7749 11.3066 12.7749ZM11.3066 4.7749C9.64664 4.7749 8.30664 6.1149 8.30664 7.7749C8.30664 9.4349 9.64664 10.7749 11.3066 10.7749C12.9666 10.7749 14.3066 9.4349 14.3066 7.7749C14.3066 6.1149 12.9666 4.7749 11.3066 4.7749Z"
                        fill="#333333"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="showPassword-icon" onClick={this.showHide}>
                    <svg
                      width="23"
                      height="20"
                      viewBox="0 0 23 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.9736 4.4248C14.7336 4.4248 16.9736 6.6648 16.9736 9.4248C16.9736 10.0748 16.8436 10.6848 16.6136 11.2548L19.5336 14.1748C21.0436 12.9148 22.2336 11.2848 22.9636 9.4248C21.2336 5.0348 16.9636 1.9248 11.9636 1.9248C10.5636 1.9248 9.22363 2.1748 7.98363 2.6248L10.1436 4.7848C10.7136 4.5548 11.3236 4.4248 11.9736 4.4248ZM1.97363 1.6948L4.25363 3.9748L4.71363 4.4348C3.05363 5.7248 1.75363 7.4448 0.973633 9.4248C2.70363 13.8148 6.97363 16.9248 11.9736 16.9248C13.5236 16.9248 15.0036 16.6248 16.3536 16.0848L16.7736 16.5048L19.7036 19.4248L20.9736 18.1548L3.24363 0.424805L1.97363 1.6948ZM7.50363 7.2248L9.05363 8.77481C9.00363 8.98481 8.97363 9.2048 8.97363 9.4248C8.97363 11.0848 10.3136 12.4248 11.9736 12.4248C12.1936 12.4248 12.4136 12.3948 12.6236 12.3448L14.1736 13.8948C13.5036 14.2248 12.7636 14.4248 11.9736 14.4248C9.21363 14.4248 6.97363 12.1848 6.97363 9.4248C6.97363 8.6348 7.17363 7.8948 7.50363 7.2248ZM11.8136 6.44481L14.9636 9.5948L14.9836 9.4348C14.9836 7.77481 13.6436 6.4348 11.9836 6.4348L11.8136 6.44481Z"
                        fill="#B0B0B0"
                      />
                    </svg>
                  </div>
                )}
                <label htmlFor="password">Password</label>
              </div>
            </form>

            <div className="register-passwords-steps">
              <hr className={upperLowercase && "active"} />
              <hr className={more8Characters && "active"} />
              <hr className={numberOrsymbol && "active"} />
            </div>
            <ul className="register-passwords-list ">
              <li className={upperLowercase && "active"}>
                Upper and lowercase letters
              </li>
              <li className={more8Characters && "active"}>
                More than 8 characters
              </li>
              <li className={numberOrsymbol ? "active" : ""}>
                Contains a number or symbol
              </li>
            </ul>
            <div className="space20" />
            <button
              type="submit"
              className="register-login-button middle"
              onClick={this.onSubmit}
            >
              Join with Email
            </button>

            <div className=" privay-term-text">
              <p>
                By joining, I agree to Gelato's{" "}
                <span className="privacy-term-underline">TOS</span> and{" "}
                <span className="privacy-term-underline">Privacy</span>.
              </p>
              <p>
                Protected by reCAPTCHA and Google's{" "}
                <span className="privacy-term-underline">Privacy</span>. and{" "}
                <span className="privacy-term-underline">Terms</span>.
              </p>
            </div>

            <div className="register-hr">
              <hr />
            </div>
            <div className=" already-member-container">
              <div className="register-already-member">
                <p>Already a member?</p>
                <div className="welcome-text">
                  <span>Welcome back!</span>
                </div>
              </div>
              <div
                className="register-login-button"
                onClick={() => this.props.history.push("/login")}
              >
                Log In
              </div>
            </div>
          </div>
        </Fragment>
      </Layout>
    );
  }
}

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {})(withRouter(Register));
