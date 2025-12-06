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

app
  .use(bodyParser.json())
  .use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true
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

  passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
  ));


process.on('uncaughtException', (err) => {
  console.log(process.stderr.fd, `Caught execption: ${err}` + `Exception origin: ${origin}`);
});

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out')});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

initDb((err, db) => {
    if (err) {
        console.error('Failed to connect to the database', err);
    } else {
        console.log('Connected to the database');

        app.use('/product', productRoutes);
        app.use('/category', categoryRoutes);
        app.use('/user', userRoutes);
        app.use('/order', orderRoutes);

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }   
});




