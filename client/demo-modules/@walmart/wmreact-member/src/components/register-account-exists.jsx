import React, {PropTypes} from "react";
import isEmpty from "lodash/isEmpty";

import Button from "@walmart/wmreact-interactive/lib/components/button";
import Password from "./common/password";
import {Message} from "@walmart/wmreact-forms";
import Field from "./common/field";

class MembershipExists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: "account-info-flyout"};
  }

  _toggle(evt) {
    evt.preventDefault();
    this.setState({show: this.state.show === "account-info-flyout" ?
      "show-hide-flyout" : "account-info-flyout" });
  }

  render() {
    const {
      headerTitle,
      btnPrimary,
      error = {}} = this.props;
    return (
      <section className="membershipExists">
        {!isEmpty(error) && <Message.Error
          className="alert-warning-message"
          block={true}
          AboveForm={true}>
           <span className="error-message-body-text">{error.message}</span>
          </Message.Error>
        }
        <div className="sam-member-exist-header-text">{headerTitle}</div>

        <form>
          <Field
            field={this.props.fields.email}
            type="text"
            label={"Email"}
            placeholder={"Email"}
            autoComplete="off"
            automationId={this.props.automation.emailInput}
            tealeafId={this.props.tealeaf.emailInput} />
          <Password
            field={this.props.fields.password}
            label={"Password"}
            placeholder={"Password"}
            automationId={this.props.automation.passwordInput}
            showAutomationId={this.props.automation.passwordShowBtn}
            hideAutomationId={this.props.automation.passwordHideBtn}
            tealeafId={this.props.tealeaf.passwordInput}
            showTealeafId={this.props.tealeaf.passwordShowBtn}
            hideTealeafId={this.props.tealeaf.passwordHideBtn}
          />
          <Button
            block
            primary={btnPrimary}
            automationId={this.props.automation.signInBtn}
            tealeafId={this.props.automation.signInBtn}>
            {"Sign in"}
          </Button>
        </form>
        <div className="account-exist-forgot-password"> &nbsp;
          <Button
            fakelink
            className="forgot-link forgot-password account-exist-forgot-link"
            automationId={this.props.automation.forgotPasswordLinkBtn}
            tealeafId={this.props.tealeaf.forgotPasswordLinkBtn}>
            {"Forgot password"}
          </Button>
        </div>
      </section>
    );
  }
}

MembershipExists.propTypes = {
  headerTitle: PropTypes.string.required,
  fields: PropTypes.shape({
    email: PropTypes.object.isRequired,
    password: PropTypes.object.isRequired
  }).isRequired,
  btnPrimary: PropTypes.bool,
  error: PropTypes.object,
  //Captcha
  captchaAvailable: PropTypes.bool,
  captcha: PropTypes.shape({
    isBot: PropTypes.number
  }),
  children: PropTypes.shape(),
  //Automation
  automation: PropTypes.shape({
    signInBtn: PropTypes.string,
    emailInput: PropTypes.string,
    passwordInput: PropTypes.string,
    passwordShowBtn: PropTypes.string,
    passwordHideBtn: PropTypes.string,
    forgotPasswordLinkBtn: PropTypes.string
  }),
  //Releaf
  tealeaf: PropTypes.shape({
    signInBtn: PropTypes.string,
    emailInput: PropTypes.string,
    passwordInput: PropTypes.string,
    passwordShowBtn: PropTypes.string,
    passwordHideBtn: PropTypes.string,
    forgotPasswordLinkBtn: PropTypes.string
  })
};

MembershipExists.defaultProps = {
  btnPrimary: true,
  automation: {
    emailInput: "account-exist-email-input",
    passwordInput: "account-exist-password-input",
    signInBtn: "account-exist-signin-btn",
    forgotPasswordLinkBtn: "account-exist-forgot-link"
  },
  tealeaf: {
    emailInput: "account-exist-email-input",
    passwordInput: "account-exist-password-input",
    signInBtn: "account-exist-signin-btn",
    forgotPasswordLinkBtn: "account-exist-forgot-link"
  }
};

export default MembershipExists;