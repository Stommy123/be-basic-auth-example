const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(process.env.MONGODB_URL, options).then(
  _ => console.log('Connected to MongoDB'),
  err => console.error('Error with connecting to MongoDB:', err)
);
