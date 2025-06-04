const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./config/passportConfig'); 

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const categoryRoutes = require('./routes/categories');
const swaggerDocs = require('./swagger');
const { connectToServer } = require('./db/conn');

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: 'Unauthorized' });
};

app.use('/api/tasks', ensureAuth, taskRoutes);
app.use('/api/categories', ensureAuth, categoryRoutes);

swaggerDocs(app);

const port = process.env.PORT || 3000;
connectToServer(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
