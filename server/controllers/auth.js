const { request, response } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { generateJWT } = require('../utils/jwt');

const loginController = async (req = request, res = response) => {
   const { username, password } = req.body;

   try {
      const user = await User.findOne({ username });

      if (!user) {
         return res
            .status(400)
            .json({ msg: 'Incorrect username or password.' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (user.active == false || !passwordMatch) {
         return res
            .status(400)
            .json({ msg: 'Incorrect username or password.' });
      }

      const token = await generateJWT(user.id, user.username, user.roles);

      res.status(200).json({
         username,
         token,
      });
   } catch (error) {
      console.error(error);
      return res.status(500).json({
         msg: 'Internal Server Error',
      });
   }
};

const registerController = async (req = request, res = response) => {
   const { username, password } = req.body;

   const hash = await bcrypt.hash(password, 10);

   await User.create({
      username,
      password: hash,
   })
      .then((user) => {
         const token = generateJWT(user.id, user.username);

         return res.status(200).json({
            username,
            token,
         });
      })
      .catch((err) => {
         console.log(err);

         return res.status(500).json({
            msg: 'There was an error creating the user.',
         });
      });
};

const infoController = async (req = request, res = response) => {
   const { token } = req.body;
   
   try {
      const { id, username, roles } = jwt.verify(token, process.env.SECRET_KEY);

      res.status(200).json({
         id,
         username,
         roles,
      });
   } catch {
      res.status(401).json({
         msg: 'Invalid token.',
      });
   }
};

module.exports = {
   loginController,
   registerController,
   infoController,
};
