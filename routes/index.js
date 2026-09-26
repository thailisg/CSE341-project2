const express = require('express');
const passport = require('passport');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/figures', require('./figures'));
router.use('/artifacts', require('./artifacts'));

router.get("/login", passport.authenticate("github"), (req, res) => { });
router.get("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect("/");
    });
});

module.exports = router;