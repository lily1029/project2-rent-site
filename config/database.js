const mongoose = require('mongoose');

// replace your database connection string here
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

// database connection event
db.on('connected', function () {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});
