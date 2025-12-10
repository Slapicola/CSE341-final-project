const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');
const { initDb } = require('./data/database');
const GithubStrategy = require('passport-github2').Strategy;
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Passport GitHub Strategy
passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Middleware
app
  .use(bodyParser.json())
  .use(session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'lax'
    }
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods', 
      'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    res.setHeader(
      'Access-Control-Allow-Headers', 
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
    );
    next();
  })
  .use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']}))
  .use(cors({ origin: '*' }))
  .use('/', require('./routes/index'));

// Error handling
process.on('uncaughtException', (err) => {
  console.error(`Caught exception: ${err}`);
});

// Home route
app.get('/', (req, res) => { 
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out')
});

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ⛔ TEST MODE → Don't start server or connect to DB
if (process.env.NODE_ENV === "test" || process.env.JEST_WORKER_ID) {
  console.log("Running in test mode — no DB connection");
  
  // Set up routes for testing without DB connection
  app.use('/product', productRoutes);
  app.use('/category', categoryRoutes);
  app.use('/user', userRoutes);
  app.use('/order', orderRoutes);
  
  module.exports = app;
} else {
  // ✅ PRODUCTION / DEVELOPMENT → Connect DB and start server
  initDb(process.env.DB_NAME, (err, db) => {
    if (err) {
      console.error('Failed to connect to the database', err);
      process.exit(1);
    } else {
      console.log('Connected to the database');

      app.use('/product', productRoutes);
      app.use('/category', categoryRoutes);
      app.use('/user', userRoutes);
      app.use('/order', orderRoutes);

      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Login at http://localhost:${PORT}/login`);
        console.log(`API Docs at http://localhost:${PORT}/api-docs`);
      });
    }   
  });

  module.exports = app;
}