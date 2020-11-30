const PASSWORD_MIN = 6;
const PASSWORD_MAX = 30;
const PASSWORD_MAX_ERROR = `Password length must be less than or equal to ${PASSWORD_MAX} characters long`;
const PASSWORD_MIN_ERROR = `Password length must be at least ${PASSWORD_MIN} characters long`;

const USERNAME_REQUIRED = "Username should be more than 5 chars long";
const NAME_REQUIRED = "Name should be more than 5 chars long";
const EMAIL_REQUIRED = "Email must be a valid email address";
const PASSWORD_REQUIRED = "Password field is required";

const USERNAME_PASSWORD_COMBINATION_ERROR =
  "These credentials do not match our records.";
const INTERNAL_SERVER_ERROR = "Something went wrong! Please try again.";
const SUCCESSFULLY_LOGGED_IN = "You have successfully logged in.";
const FETCH_INFO_ERROR_MESSAGE = "Could not fetch your account information";

module.exports = {
  PASSWORD_MAX,
  PASSWORD_MIN,
  PASSWORD_MAX_ERROR,
  PASSWORD_MIN_ERROR,
  USERNAME_REQUIRED,
  EMAIL_REQUIRED,
  NAME_REQUIRED,
  PASSWORD_REQUIRED,
  USERNAME_PASSWORD_COMBINATION_ERROR,
  INTERNAL_SERVER_ERROR,
  SUCCESSFULLY_LOGGED_IN,
  FETCH_INFO_ERROR_MESSAGE,
};
