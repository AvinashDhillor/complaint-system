const app = require('express').Router();
const _ = require('lodash');

const User = require('../db/models/ClientUser');
const Complaint = require('../db/models/Complaint');
const Department = require('../db/models/Department');

const { authenticate } = require('../middleware/client/clientUserAuth.js');

app.post('/signup', authenticate, (req, res) => {
  var body = _.pick(req.body, [
    'name',
    'email',
    'password',
    'address',
    'role',
    'contactNumber'
  ]);
  body.isVerified = true;
  let user = new User(body);
  user
    .save()
    .then(() => {
      return user.generateAuthToken('auth');
    })
    .then(token => {
      res.header('cu-auth', token).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken('auth').then(token => {
        res.header('cu-auth', token).send({ user, token });
      });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(
    () => {
      res.status(200).send();
    },
    () => {
      res.status(400).send();
    }
  );
});

app.get('/u/d/users', authenticate, (req, res) => {
  if (req.user.role === 'admin') {
    let data = {
      role: 'department',
      isVerified: false
    };

    User.find(data)
      .populate('departmentId')
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
});

app.get('/v/d/users', authenticate, (req, res) => {
  if (req.user.role === 'admin') {
    let data = {
      role: 'department',
      isVerified: true
    };
    User.find(data)
      .populate('departmentId')
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
});

app.get('/a/users', authenticate, (req, res) => {
  if (req.user.role === 'admin') {
    let data = {
      role: 'admin',
      isVerified: true
    };
    User.find(data)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
});

app.get('/u/c/users', authenticate, (req, res) => {
  if (req.user.role === 'admin') {
    let data = {
      role: 'client',
      isVerified: false
    };

    User.find(data)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
});

app.get('/v/c/users', authenticate, (req, res) => {
  if (req.user.role === 'admin') {
    let data = {
      role: 'client',
      isVerified: true
    };

    User.find(data)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
});

app.post('/verify/user', authenticate, (req, res) => {
  if (req.user.role === 'admin') {
    console.log(req.body._id);

    User.findOneAndUpdate(
      { _id: req.body._id },
      { $set: { isVerified: true } },
      { new: true }
    )
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
});

app.post('/delete/user', authenticate, (req, res) => {
  if (req.user.role === 'admin') {
    User.findByIdAndDelete(req.body._id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
});

app.post('/delete/department', authenticate, (req, res) => {
  if (req.user.role === 'admin') {
    Department.findByIdAndDelete(req.body._id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
});

// Complaints Route
app.get('/j/complaints', authenticate, (req, res) => {
  if (req.user.role === 'admin') {
    let data = {
      isPending: true
    };

    Complaint.find(data)
      .sort({ createdAt: -1 })
      .populate('departmentId')
      .populate('createdBy')
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
});

app.post('/j/complaints/approve', authenticate, (req, res) => {
  if (req.user.role === 'admin') {
    let data = {
      isPending: true,
      _id: req.body._id
    };

    Complaint.findOneAndUpdate(
      data,
      { $set: { isPending: false } },
      { new: true }
    )
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
});
app.post('/j/complaints/reject', authenticate, (req, res) => {
  if (req.user.role === 'admin') {
    let data = {
      isPending: true,
      _id: req.body._id
    };

    Complaint.findOneAndUpdate(
      data,
      { $set: { isPending: false, isRejected: true } },
      { new: true }
    )
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
});

module.exports = app;
