import {reduxForm} from "redux-form";
import noop from "lodash/noop";

import {signIn} from "../../actions/auth";
import {CaptchaSignIn as SignInForm} from "./captcha-sign-in";

import validators from "../../common/validators";
import {getEmailFromForgotEmailResponse, validateForm, handleResponse} from "../../common/helpers";

const {required, email, password} = validators;
const formName = "signIn";
const formFieldValidators = {
  email: [required, email],
  password: [required, password]
};

export default reduxForm({
  form: formName,
  touchOnBlur: false,
  fields: Object.keys(formFieldValidators),
  validate: validateForm(formFieldValidators, formName),
  returnRejectedSubmitPromise: true
},
  (state) => ({defaultEmail: getEmailFromForgotEmailResponse(state), ...state.signIn}),
  (dispatch, {onSubmit = noop, onSuccess = noop, onError = noop}) => ({
    //The stuff to do on handleSubmit
    onSignIn: (data) => {
      onSubmit(data);

      return dispatch(signIn(data));
    },
    //The stuff to do after handleSubmit
    handleResponse: (promise) =>
      handleResponse(promise, onSuccess, onError, formFieldValidators)
  })
)(SignInForm);
