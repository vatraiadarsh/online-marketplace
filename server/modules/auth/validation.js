const Joi = require("joi");
const _ = require("lodash");

exports.validateSignup = (req, res, next) => {
  const schema = Joi.object().keys({
    Name: Joi.string().alphanum().min(3).max(30).required(),
    Email: Joi.string().email().lowercase().required(),
    Password: Joi.string().min(7).required().strict(),
  });

  let data = _.pick(req.body, ["name", "email", "password"]);

  const { error } = schema.validate({
    Name: data.name,
    Email: data.email,
    Password: data.password,
  });
  if (error) {
    res.json({ error: error.details[0].message });
  }
  next();
};

exports.validateSignin = (req, res, next) => {
  const schema = Joi.object().keys({
    Email: Joi.string().email().lowercase().required(),
    Password: Joi.string().min(7).required().strict(),
  });

  let data = _.pick(req.body, ["email", "password"]);

  const { error } = schema.validate({
    Email: data.email,
    Password: data.password,
  });
  if (error) {
    res.json({ error: error.details[0].message });
  }
  next();
};
