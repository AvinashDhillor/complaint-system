const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, err => {
  if (err) console.log('Error connecting to database.');
  else console.log('Succesfully connected to database.');
});
