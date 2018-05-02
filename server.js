const express = require('express');
const session = require('express-session');
const nconf = require('nconf');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');
var util = require('util');
var mongodb = require('mongodb');
var client = mongodb.MongoClient;

var myuser;
  
// Initialize configuration.
nconf.argv()
  .env()
  .file({file: './backend/app/config.json' });

/** Create the uri object to be used to create the connection */
var uri = util.format('mongodb://%s:%d/%s',
    nconf.get('db:HOST'), nconf.get('db:PORT'), nconf.get('db:DATABASE'));

// Initialize authentication.
passport.use(new Auth0Strategy({  
  domain: nconf.get('auth:AUTH0_DOMAIN'),
  clientID: nconf.get('auth:AUTH0_CLIENT_ID'),
  clientSecret: nconf.get('auth:AUTH0_CLIENT_SECRET'),
  scope: 'openid profile',
  callbackURL: '/login/callback'
}, function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
}));

// Initialize the app.
const app = new express();  

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

console.log(nconf.get('auth:DEFAULT_DOCS_DIRECTORY'));
app.use(express.static(path.join(nconf.get('auth:DEFAULT_DOCS_DIRECTORY'))));
app.use(cookieParser());  
app.use(session({  
  secret: nconf.get('auth:SESSION_SECRET'),
  saveUninitialized: false,
  resave: false,
  cookie: {
      maxAge: 360000
  }
}));
app.use(passport.initialize());  
app.use(passport.session());  
passport.serializeUser((user, done) => done(null, user));  
passport.deserializeUser((user, done) => done(null, user));  

app.use(compression());

// Authentication endpoints.
app.get('/login',  
  passport.authenticate('auth0', { connection: nconf.get('auth:AUTH0_CONNECTION') }),
  function(req, res) {  });

app.get('/login/callback',  
  passport.authenticate('auth0'),
  function(req, res, user) {
    req.session.save(function( err ){
        //console.log(req.user.displayName);
        myuser = req.user.displayName;

        //var uri = util.format('mongodb://%s:%s@%s:%d/%s',
        //    auth.user, auth.pass, auth.host, auth.port, auth.name);

        /** Connect to the Mongo database at the URI using the client */
        client.connect(uri, { auto_reconnect: true }, function (err, db) {
            if (err) throw err;
            else if (!db) console.log('Unknown error connecting to database');
            else {

                console.log('Connected to MongoDB database server at:');
                console.log('\n\t%s\n', uri);

                var dbo = db.db("authdoc");

                dbo.collection("users")
                .find(
                    {name: myuser}
                ).toArray(
                    function(err, result){
                        if (err) throw err;

                        if(result.length==0){
                            console.log("No data for the user: " + myuser);
                            res.redirect('/login');
                        }else if (result.length==1){
                            console.log("Number of documentations available for this user: " + result[0].documentation.length);
                            if(result[0].documentation.length == 1){
                                let obj = result[0].documentation[0];
                                res.redirect(obj.url);     
                            }else if(result[0].documentation.length > 1){
                                console.log(result[0]);
                                console.log("This user has multiple documentations options please select one.");
                                app.use('/', express.static(path.join(__dirname, '/frontend/dist')));
                                res.redirect('/');
                            }
                        }else if (result.length>1){
                            console.log("There are TWO records for this user. This is not a correct conf, please call your administrator");
                            res.redirect('/login');                            
                        }
                        db.close();
                    }
                );


                //res.redirect('/static');     
            }
        });
    });
  }
);

app.get('/logout',  
  function(req, res) {
    req.logOut();
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });

  app.post('/documents',  
  function(req, res) {
    app.use(express.static(path.join(nconf.get('auth:DEFAULT_DOCS_DIRECTORY'))));
    var doc = req.body.url;
    // console.log(doc);
    res.redirect(doc);
  });

  app.get('/documents',  
  function(req, res) {

    client.connect(uri, { auto_reconnect: true }, function (err, db) {
        if (err) {
            throw err;
        } else if (!db) {
            console.log('Unknown error connecting to database');
        } else {
            console.log('Connected to MongoDB database server at:');
            console.log('\n\t%s\n', uri);

            var dbo = db.db("authdoc");

            dbo.collection("users")
            .find(
                {name: myuser}
            ).toArray(
                function(err, result){
                    if(err){
                        console.log(err);
                        db.close();
                    }
                    res.json(result);
                    db.close();
                }
            );
        }
    });
    
  });

// Force authentication for the next routes.
app.use(function(req, res, next) { 
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
});

// Start the server.
const port = process.env.PORT || 4000;  
app.listen(port, function(error) {  
  if (error) {
    console.log(error);
  } else {
    console.log('Listening on http://localhost:' + port);
  }
});
