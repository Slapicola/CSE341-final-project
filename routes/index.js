const passport = require('passport');
const router = require('express').Router();

router.get('/login', passport.authenticate('github'), (req, res) => {
  req.session.user = req.user; 
  res.redirect('/api-docs'); 
});

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/api-docs' }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.get('/check-session', (req, res) => {
    res.json({
        isAuthenticated: req.session.user !== undefined,
        user: req.session.user || null
    });
});


module.exports = router;