const jwt = require('jsonwebtoken');

exports.googleCallback = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const userPayload = {
    id: req.user.id,
    displayName: req.user.displayName,
    email: req.user.email,
    photo: req.user.photo
  };

  const token = jwt.sign(userPayload, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });

  res.redirect(`${process.env.CLIENT_URL}/?token=${token}`);
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logged out' });
  });
};
