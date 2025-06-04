require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const { connectToServer } = require('./db/conn');

require('./config/passportConfig'); 

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const categoryRoutes = require('./routes/categories');

const app = express();

app.use(cors());
app.use(express.json());

if (!process.env.SESSION_SECRET) {
  console.error('✋ ERROR: SESSION_SECRET no definido en las Environment Variables');
  process.exit(1);
}

app.use(
  session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 // 1 día
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

const ensureAuth = require('./middleware/ensureAuth');
app.use('/api/tasks', ensureAuth, taskRoutes);
app.use('/api/categories', ensureAuth, categoryRoutes);

const swaggerDocs = require('./swagger');
swaggerDocs(app);

const port = process.env.PORT || 3000;
connectToServer(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
