const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const _ = require('lodash');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    contactNumber: {
      type: String
    },
    address: {
      type: String,
      required: true
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Department'
    },
    role: {
      type: String,
      require: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    isActivated: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date,
      default: null
    },
    tokens: [
      {
        access: {
          type: String,
          required: true
        },
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

UserSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  if (userObject.role === 'department') {
    return _.pick(userObject, [
      'name',
      'email',
      'contactNumber',
      'address',
      'departmentId',
      'role'
    ]);
  }
  return _.pick(userObject, [
    'name',
    'email',
    'contactNumber',
    'address',
    'role'
  ]);
};

UserSchema.pre('save', function(next) {
  let user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// generating token after signup
UserSchema.methods.generateAuthToken = function(access) {
  let user = this;
  let expiresIn = {};
  if (access == 'verify' || access == 'reset') {
    expiresIn = { expiresIn: '30m' };
  }
  let token = jwt
    .sign(
      {
        _id: user._id.toHexString(),
        access: access,
        email: user.email,
        isCompany: true
      },
      process.env.SECRET_KEY,
      { expiresIn: 3600 }
    )
    .toString();

  user.tokens.push({
    access,
    token
  });

  return user.save().then(() => token);
};

// Check ..for middleware
UserSchema.statics.findByToken = function(token) {
  let User = this;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    email: decoded.email,
    'tokens.access': decoded.access,
    'tokens.token': token
  });
};

// Login
UserSchema.statics.findByCredentials = function(email, password) {
  let User = this;

  return User.findOne({ email: email }).then(user => {
    if (!user) {
      return Promise.reject({ email: 'Email does not exist' });
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject({ password: 'Password does not match' });
        }
      });
    });
  });
};

// Logout
UserSchema.methods.removeToken = function(token) {
  let user = this;
  return user.updateOne({
    $pull: {
      tokens: {
        token: token
      }
    }
  });
};

const ClientUser = mongoose.model('ClientUser', UserSchema);

module.exports = ClientUser;
