const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const EMAIL_REGEX = /([a-z0-9_\-.+]+)@\w+(\.\w+)*/gi;

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        const isEmail = value.match(EMAIL_REGEX);

        if (!isEmail) throw new Error('Not valid email');
      },
    },
    // this will be an array of mongo ids
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SomeModel',
      },
    ],
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 6) throw new Error('Password must be at least 6 characters long.');
        // more validations here
        // one uppercase
        // on special character
        // etc etc etc
      },
    },
  },
  { timestamps: true }
);

// makes sure that when you request users, they won't be sent back with their password
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

// creates an auth token that decodes to { _id: string, email: string }
UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id.toString(),
      email: user.email,
    },
    process.env.JWT_SECRET
  );
  return token;
};

// finds a user by email then compare password with what is stored on the model
// throws an error if not user is not found or password sent does not match
UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Something went wrong, try again.');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Something went wrong, try again.');
  return user;
};

// if the user is updated and the password is different, this will re-hash it before persisting
UserSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
