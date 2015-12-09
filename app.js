var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var Datastore = require('nedb'),
    db = new Datastore({ filename: './users.nedb', autoload: true });

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var snippets = require('./routes/snippet');

//passport
// var credentials = {
    // 'user1': 'user1',
    // 'a': 'a',
    // 'user3': 'user3',
// };

passport.use('local', new LocalStrategy(
    function(username, password, done) {
        // console.log(username, password);
		db.findOne({username: username}, function (err, user) {
			if (err) return done(err);
			
			if (user.password !== password) {
				return done(null, false, { message: 'Incorrect credentials.' });
			}
			return done(null, user);
		});
    }
));

passport.serializeUser(function(user, done) {
   done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
	db.findOne({_id: id}, function (err, user) {
		if (err) return done(err);
		
		done(null, user);
	});
});

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/auth/login');
}

//app


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'titkos szoveg',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', routes);
app.use('/users', isLoggedIn, users);
app.use('/auth', login);
app.use('/api/snippets', snippets);

app.get('/fill', function (req, res) {
	db.insert({
		username: 'a',
		password: 'a',
	});
	db.insert({
		username: 'b',
		password: 'b',
	});
	res.send('ok');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
