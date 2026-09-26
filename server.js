require('dotenv').config();
const express = require('express');

const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const { handlerErrors } = require('./middleware/handdleErrors');

const app = express();

const port = process.env.PORT || 3000;

const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github2').Strategy
const cors = require('cors')

//body-parser
app.use(bodyParser.json());

//session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

//passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }));

passport.serializeUser((user, done) => {
    done(null, user);

})

passport.deserializeUser((user, done) => {
    done(null, user);
})

app
    .use(cors({ methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'] }))
    .use(cors({ origin: '*' }))
    .use('/', require('./routes'));

app.use('/', require('./routes'));
app.use(handlerErrors);

app.get('/', (req, res) => {res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}`: 'Logged Out');});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

mongodb.initDb((err) => {
if(err){
    console.log(err);
}else{
    app.listen(port, () => (console.log(`Database is listening and node Running on port ${port}`)));
}
});
