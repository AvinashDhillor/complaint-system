const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, err => {
  if (err) console.log('Error connecting to database.');
  else console.log('Succesfully connected to database.');
});
