const { validationResult } = require('express-validator');
const User = require('../models/User');

const loginValidation = (req, res, next) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(401).json({
         msg: 'Incorrect username or password.',
      });
   }

   next();
};

const signUpValidation = (req, res, next) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(401).json(errors);
   }

   next();
};

const passwordConfirmation = (passwordConfirmation, { req }) => {
   if (passwordConfirmation != req.body.password) {
      throw new Error('Password confirmation does not match password.');
   }
   return true;
};

const usernameTaken = async (username) => {
   const usedUsername = await User.findOne({ username });

   if (usedUsername) {
      throw new Error('Username already taken.');
   }
   return true;
};

module.exports = {
   loginValidation,
   signUpValidation,
   passwordConfirmation,
   usernameTaken,
};
