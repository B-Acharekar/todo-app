const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.create({ username, password });
  const token = createToken(user._id);
  res.status(201).json({ token });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = createToken(user._id);
  res.json({ token });
};
