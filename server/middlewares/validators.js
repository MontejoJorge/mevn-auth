const { validationResult } = require('express-validator');

const notStartsWith =
   (notInitialCharacters = []) =>
   (value) => {
      notInitialCharacters.forEach((char) => {
         if (value.startsWith(char)) {
            throw new Error(`Username can not start with '${char}'.`);
         }
      });
      return true;
   };

const notEndsWith =
   (notFinalCharacters = []) =>
   (value) => {
      notFinalCharacters.forEach((char) => {
         if (value.endsWith(char)) {
            throw new Error(`Username can not end with '${char}'.`);
         }
      });
      return true;
   };

const validateFields = (req, res, next) => {
   
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json(errors);
   }

   next();
};

module.exports = {
   notStartsWith,
   notEndsWith,
   validateFields,
};
