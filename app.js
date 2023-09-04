const express = require('express');
const Pizza = require('./models/pizzaModel');
const pizzaRouter = require('./routes/pizzaRoutes');
const userRouter = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const orderRouter = require('./routes/orderRoutes');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'build')));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  next();
});

app.use('/api/pizzas', pizzaRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.get('*', (req, res) => res.sendFile(path.resolve('build', 'index.html')));

module.exports = app;
