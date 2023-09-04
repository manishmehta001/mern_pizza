const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

router
  .route('/register')
  .get(userController.getAllUsers)
  .post(userController.userRegister);
router.route('/deleteuser').post(userController.deleteUser);
router.route('/login').post(userController.userlogin);
module.exports = router;
