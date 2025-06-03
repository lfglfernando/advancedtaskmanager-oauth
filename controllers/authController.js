// controllers/authController.js
exports.loginSuccess = (req, res) => {
    res.json({ message: 'Login successful', user: req.user });
  };

  exports.loginFailure = (req, res) => {
    res.status(401).json({ error: 'Login failed' });
  };
  
  exports.logout = (req, res) => {
    req.logout(() => {
      res.json({ message: 'Logged out' });
    });
  };
  
  exports.checkStatus = (req, res) => {
    if (req.user) {
      res.json({ loggedIn: true, user: req.user });
    } else {
      res.json({ loggedIn: false });
    }
  };
  