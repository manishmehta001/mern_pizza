const express = require('express');
const pizzaController = require('./../controllers/pizzaController');

const router = express.Router();

router.route('/getAllPizzas').get(pizzaController.getAllPizzas);
router.route('/addpizza').post(pizzaController.createPizza);
router.route('/getpizzabyid').post(pizzaController.getPizza);
router.route('/editpizza').post(pizzaController.editedPizza);
router.route('/deletepizza').post(pizzaController.deletePizza);
module.exports = router;
