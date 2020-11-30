const router = require("express").Router();
const { signup, accountActivation, signin } = require("./authRepo");
const { validateSignup, validateSignin } = require("./validation");

router.post("/signup", validateSignup, signup);
router.post("/account-activation", accountActivation);
router.post("/signin", validateSignin, signin);

module.exports = router;
