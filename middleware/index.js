const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

class AuthorizationError extends Error {
  constructor() {
    super('Unauthorized');
    this.status = 404;
  }
}

module.exports.withAuth = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization || '';
    const token = authorizationHeader.split('Bearer ')[1];

    if (!token) {
      next(new AuthorizationError());
      return;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = decodedToken;
    const maybeUser = await User.findById(_id);

    console.log('user?', maybeUser);

    if (!maybeUser) {
      next(new AuthorizationError());
      return;
    }

    req.currentUser = maybeUser;

    next();
  } catch (err) {
    res.status(404).send({ err: err.toString() });
  }
};
