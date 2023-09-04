const User = require('./../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).json({ error: `Something went wrong: ${error.message}` });
  }
};

exports.deleteUser = async (req, res) => {
  const userid = req.body.userid;
  try {
    await User.findByIdAndDelete({ _id: userid });
    res.send('Pizza Deleted successfully');
  } catch (error) {
    res.status(400).json({ message: error.message, status: 'Fail' });
  }
};

exports.userRegister = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    if (req.body.password !== req.body.confirmpassword) {
      res.status(400).json({
        error: 'Password and confirm password do not match',
      });
    } else {
      res.status(201).json({
        message: 'success',
        data: {
          newUser,
        },
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.userlogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email, password });
    if (user.length > 0) {
      const currentUser = {
        name: user[0].name,
        email: user[0].email,
        isAdmin: user[0].isAdmin,
        _id: user[0]._id,
      };
      res.send(currentUser);
    } else {
      res.send('invalid login details');
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
