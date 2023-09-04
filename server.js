const dotenv = require('dotenv');
const app = require('./app');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.warn('DB connection successful!');
  })
  .catch((err) => {
    console.warn(err);
  });

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.warn(`App is running on port ${port}`);
});
