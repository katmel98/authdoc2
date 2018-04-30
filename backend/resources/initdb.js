var User = require( '../app/models/Users' );
var util = require('util');
var mongodb = require('mongodb');
var client = mongodb.MongoClient;

/** Data for connect into mongodb */
var auth = {
    user : '',
    pass : '',
    host : 'localhost',
    port : '27017',
    name : 'authdoc'
}

//var uri = util.format('mongodb://%s:%s@%s:%d/%s',
//    auth.user, auth.pass, auth.host, auth.port, auth.name);

/** Create the uri object to be used to create the connection */
var uri = util.format('mongodb://%s:%d/%s',
    auth.host, auth.port, auth.name);


/** Connect to the Mongo database at the URI using the client */
client.connect(uri, { auto_reconnect: true }, function (err, database) {
    if (err) throw err;
    else if (!database) console.log('Unknown error connecting to database');
    else {

        console.log('Connected to MongoDB database server at:');
        console.log('\n\t%s\n', uri);

        /** Create  user model to create the first user in the database. The model structure is: 
         * 
         *  USER MODEL: 
         *  { 
         *    name : <string>
         *    documentation: <array> [
         *      <object> {
         *          name : <string>,
         *          url  : <string>
         *      }
         *    ]
         *  } 
         * 
         */

        var user = new User("katmel98@gmail.com");
        
        /* var doc = {
            name : "Temis Workflow",
            url  : ""
        };
        user.addDocumentationAddress(doc); */

        console.log("User to be created: ");
        console.log(user);

        /** Insert the first user into database */
        var dbo = database.db("authdoc");
        
        /** Check if the user is created in the database */
        dbo.collection("users").findOne({"name":"katmel98@gmail.com"}, function(err, result){

            /** Verify existance */
            if(result==null){

                /** If user not exist, the create the initial user */
                dbo.collection("users").insertOne(user, function(err, res) {
                    if(err) throw err;
                    console.log("1 document inserted.");
                    database.close();
                });        
            }else{
                console.log("\n%s\n","This user already is in the database!!!");
                database.close();
            }

        });
    }

});