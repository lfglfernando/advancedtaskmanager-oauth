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
    expiresIn: '1d'
  });

  // ✅ Redirige a /api-docs con el token
  res.redirect(`${process.env.BASE_URL}/api-docs?token=${token}`);
};
