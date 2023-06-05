const mongoose = require('mongoose');

const DB_HOST =
  'mongodb+srv://VilliaV:H7uaaeNTbhdZzRF1@cluster0.mppimuj.mongodb.net/db-contacts?retryWrites=true&w=majority';

const app = require('./app');

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log('Database connection successful');
    });
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });

// H7uaaeNTbhdZzRF1
