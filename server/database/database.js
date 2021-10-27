const mongoose = require('mongoose');

const dbConnection = async () => {
   try {
      await mongoose.connect('mongodb://localhost:27017/mevn-auth');

      console.log('Database ready.');
   } catch (error) {
      mongoose.disconnect();

      console.error(error);
      throw new Error('Error conecting to the database.');
   }
};

module.exports = dbConnection;
