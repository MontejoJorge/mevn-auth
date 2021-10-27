const express = require('express');
const cors = require('cors');
const history = require('connect-history-api-fallback');
const path = require('path');
const dbConnection = require('./database/database');

class Server {
   constructor() {
      this.app = express();
      this.port = process.env.PORT || 3000;
      this.app.enable('trust proxy');

      this.conectDB();

      this.middlewares();

      this.routes();

      this.app.use(history());
      this.app.use(express.static(path.join(__dirname, '../client/dist')));
   }

   async conectDB() {
      await dbConnection();
   }

   middlewares() {
      this.app.use(cors());

      this.app.use(express.json());

      this.app.use(express.urlencoded({ extended: true }));
   }

   routes() {
      this.app.use('/api/auth', require('./routes/auth'));
   }

   listen() {
      this.app.listen(this.port, () => {
         console.log('Server runing on port:', this.port);
      });
   }
}

module.exports = Server;
