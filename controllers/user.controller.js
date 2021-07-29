const mongoose = require('mongoose');

const User = require('../models/user.model');
const { validateRequest } = require('../utils');

module.exports.create = async (req, res) => {
  try {
    validateRequest(req.body, ['email', 'password']);

    const user = new User(req.body);

    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.toString() });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    validateRequest(req.body, ['email', 'password']);

    const user = await User.findByCredentials(email, password);

    const token = await user.generateAuthToken();

    res.json({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.toString() });
  }
};

exports.getCurrent = async (req, res) => {
  res.json({ user: req.currentUser });
};

exports.updateFavorite = async (req, res) => {
  try {
    const { favorites } = req.currentUser;
    const { id } = req.params;

    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new Error('ID not a valid');
    }

    const shouldRemove = favorites.includes(id);

    const updatedFavorites = shouldRemove ? favorites.filter(fav => fav === id) : [...favorites, id];

    req.currentUser.favorites = updatedFavorites;

    await req.currentUser.save();

    res.send({ user: req.currentUser });
  } catch (error) {
    res.status(400).send({ error: error.toString() });
  }
};

exports.update = async (req, res) => {
  const { _id } = req.currentUser;
  const { email, password } = req.body;

  const updateObj = { email, password };

  const updates = Object.keys(updateObj);

  try {
    validateRequest(updateObj, ['email', 'password']);

    const user = await User.findById(_id);

    updates.forEach(update => {
      user[update] = updateObj[update];
    });

    await user.save();

    res.send({ user });
  } catch (error) {
    res.status(400).send({ error: error.toString() });
  }
};
