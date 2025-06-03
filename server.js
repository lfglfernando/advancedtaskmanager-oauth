const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieSession = require('cookie-session');
const passport = require('passport');

dotenv.config();
require('./config/passportConfig');

const { connectToServer } = require('./db/conn');

const taskRoutes = require('./routes/tasks');
const categoryRoutes = require('./routes/categories');
const authRoutes = require('./routes/auth');

const swaggerDocs = require('./swagger');

const app = express();
app.use(cors());
app.use(express.json());

app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_SECRET],
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/tasks', taskRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/auth', authRoutes);

swaggerDocs(app);

const port = process.env.PORT || 3000;
connectToServer(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
