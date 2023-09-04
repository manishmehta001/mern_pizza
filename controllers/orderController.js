const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const stripe = require('stripe')(process.env.SECRET_KEY);
const { v4: uuidv4 } = require('uuid');
const Order = require('./../models/orderModel');

exports.createOrder = async (req, res) => {
  const { token, subtotal, currentUser, cartItems } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: subtotal * 100,
        currency: 'inr',
        customer: customer.id,
        receipt_email: token.email,
        payment_method_types: ['card'],
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (paymentIntent) {
      const neworder = new Order({
        name: currentUser.name,
        email: currentUser.email,
        userid: currentUser._id,
        orderItems: cartItems,
        orderAmount: subtotal,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          pincode: token.card.address_zip,
        },
        transactionId: paymentIntent.id,
      });

      neworder.save();
      res.send('Order placed successfully');
    } else {
      res.send('Payment failed');
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Something went wrong', error: error });
  }
};

exports.getOrder = async (req, res) => {
  const { userID } = req.body;
  try {
    const orders = await Order.find({ userID: userID }).sort({ _id: -1 });
    res.send(orders);
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(201).send(orders);
  } catch (error) {
    return res.status(400).json({ message: error.message, status: 'Fail' });
  }
};

exports.deliverOrder = async (req, res) => {
  const orderid = req.body.orderid;
  try {
    const order = await Order.findOne({ _id: orderid });
    order.isDelivered = true;
    const savedOrder = await order.save();
    res.status(201).send(savedOrder);
  } catch (error) {
    return res.status(400).json({ message: error.message, status: 'Fail' });
  }
};
