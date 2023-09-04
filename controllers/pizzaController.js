const Pizza = require('./../models/pizzaModel');

exports.getAllPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.status(200).send(pizzas);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.createPizza = async (req, res) => {
  const pizza = req.body.pizza;
  try {
    const newPizza = new Pizza({
      name: pizza.name,
      image: pizza.image,
      varient: ['small', 'medium', 'large'],
      description: pizza.description,
      category: pizza.category,
      prices: [pizza.prices],
    });
    const savedPizza = await newPizza.save();
    res.status(201).send(savedPizza);
  } catch (error) {
    res.status(404).json({
      message: error.message,
      status: 'Fail',
    });
  }
};

exports.getPizza = async (req, res) => {
  const pizzaid = req.body.pizzaid;
  try {
    const pizza = await Pizza.findOne({ _id: pizzaid });
    res.status(201).send(pizza);
  } catch (error) {
    res.status(400).json({
      message: error.message,
      status: 'Fail',
    });
  }
};

exports.editedPizza = async (req, res) => {
  const editedpizza = req.body.editedpizza;

  try {
    const pizza = await Pizza.findOne({ _id: editedpizza._id });

    (pizza.name = editedpizza.name),
      (pizza.description = editedpizza.description),
      (pizza.image = editedpizza.image),
      (pizza.category = editedpizza.category),
      (pizza.prices = [editedpizza.prices]);

    const savedPizza = await pizza.save();

    res.status(201).send(savedPizza);
  } catch (error) {
    return res.status(400).json({ message: error.message, status: 'Fail' });
  }
};

exports.deletePizza = async (req, res) => {
  const pizzaid = req.body.pizzaid;

  try {
    await Pizza.findOneAndDelete({ _id: pizzaid });
    res.send('Pizza Deleted successfully');
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
