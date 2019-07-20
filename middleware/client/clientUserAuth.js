const ComapnyUser = require('../../db/models/ClientUser');

const authenticate = (req, res, next) => {
  const token = req.header('cu-auth');
  ComapnyUser.findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject();
      }
      req.user = user;
      req.token = token;
      next();
    })
    .catch(e => {
      return res.status(401).json({ error: 'not authenticated' });
    });
};

module.exports = {
  authenticate
};
