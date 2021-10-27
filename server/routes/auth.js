const router = require('express').Router();
const {
   loginController,
   registerController,
   infoController,
} = require('../controllers/auth');
const { body, check } = require('express-validator');
const {
   loginValidation,
   signUpValidation,
   passwordConfirmation,
   usernameTaken,
} = require('../middlewares/auth');
const {
   notStartsWith,
   notEndsWith,
   validateFields,
} = require('../middlewares/validators');

const usernameRegex =
   '^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$';
const passwordRegex =
   '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{6,20}$';

router.post(
   '/login',
   [
      body('username').matches(usernameRegex),
      body('password').matches(passwordRegex),
      loginValidation,
   ],
   loginController
);

router.post(
   '/signup',
   [
      check('username')
         .isLength({ min: 6, max: 20 })
         .withMessage('Username must be between 8 and 20 characters long.')
         .custom(notStartsWith(['.', '_']))
         .custom(notEndsWith(['.', '_']))
         .not()
         .matches('[._]{2}')
         .withMessage('Special characters cannot go together.')
         .matches(usernameRegex)
         .withMessage('Invalid username.'),
      body('password')
         .isLength({ min: 8, max: 128 })
         .withMessage('Password must be between 8 and 128 characters long.')
         .matches('.*[a-z].*')
         .withMessage('Password must have at least one lowercase character.')
         .matches('.*[A-Z].*')
         .withMessage('Password must have at least one uppercase character.')
         .matches('.*[¡!$%&@#?¿].*')
         .withMessage(
            'Password must have at least one special character (¡!$%&@#?¿).'
         ),
      body('password').matches(passwordRegex).withMessage('Invalid password.'),
      body('passwordConfirmation').custom(passwordConfirmation),
      body('username').custom(usernameTaken),
      signUpValidation,
   ],
   registerController
);

router.post(
   '/info',
   [check('token').isJWT().withMessage('Invalid token.'), validateFields],
   infoController
);

module.exports = router;
