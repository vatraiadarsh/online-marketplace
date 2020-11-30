const _ = require("lodash");
const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");
const {
  EMAIL_FROM,
  CLIENT_URL,
  JWT_ACCOUNT_ACTIVATION,
  JWT_ACCOUNT_ACTIVATION_EXPIRES_IN,
  SENDGRID_API_KEY,
} = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const User = require("../../models/user");
const ErrorResponse = require("../../utils/errorResponse");

exports.signup = async (req, res, next) => {
  let data = _.pick(req.body, ["name", "email", "password"]);
  try {
    const Emailexists = await User.findOne({ email: { $eq: data.email } });
    if (Emailexists) {
      return next(
        new ErrorResponse(
          `Email already exists! Please signin to continue`,
          401
        )
      );
    }
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    const token = jwt.sign(payload, JWT_ACCOUNT_ACTIVATION, {
      expiresIn: JWT_ACCOUNT_ACTIVATION_EXPIRES_IN,
    });
    console.log(token);

    const emailData = {
      to: data.email,
      from: EMAIL_FROM,
      subject: `Account activation link`,
      html: `
          <p>Please use the following link to activate your account</p>
          <p>${CLIENT_URL}/auth/activate/${token}</p>
          <p>This email may contain sensative information</p>
          `,
    };

    let sent = await sgMail.send(emailData);
    if (sent) {
      return res.json({
        message: `Email has been sent to ${data.email}. Follow the instruction to activate your account`,
      });
    }
  } catch (err) {
    return next(
      new ErrorResponse(`SOmething went wrong. Please try again`, 500)
    );
  }
};

exports.accountActivation = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (token) {
      let data = jwt.verify(token, JWT_ACCOUNT_ACTIVATION);
      if (!data) {
        console.log("JWT VERIFY IN ACCOUNT ACTIVATION ERROR", err);
        return next(new ErrorResponse(`"Expired link. Signup again"`, 401));
      }

      // prevent saving the same user multiple time when the activation link is clicked
      const userExist = await User.findOne({ email: { $eq: data.email } });
      if (userExist) {
        return next(
          new ErrorResponse(
            `You have successfully signed up! Please sign in`,
            401
          )
        );
      }
      const { name, email, password } = jwt.decode(token);
      const user = await new User({ name, email, password }).save();
      if (!user) {
        return next(
          new ErrorResponse(
            `Error saving user in database. Try signup again`,
            500
          )
        );
      }
      return res.json({
        message: "Signup success. Please signin.",
      });
    }
  } catch (err) {
    return next(
      new ErrorResponse(
        `The link is not valid :: Expired link. Signup again"`,
        401
      )
    );
  }
};

exports.signin = async (req, res, next) => {
  try {
    const data = _.pick(req.body, ["email", "password"]);
    const user = await User.findOne({ email: { $eq: data.email } });
    if (!user) {
      return next(
        new ErrorResponse(`User with that email doesnot exists"`, 401)
      );
    }

    const isMatch = await user.matchPassword(data.password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const token = await user.generateToken();

    const { _id, name, email, role } = user;

    return res.status(200).json({
      token,
      _id,
      name,
      email,
      role,
    });
  } catch (error) {
    return next(
      new ErrorResponse(`SOmething went wrong. Please try again`, 500)
    );
  }
};
