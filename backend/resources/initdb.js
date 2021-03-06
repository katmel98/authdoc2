var User = require( '../app/models/Users' );
var util = require('util');
const nconf = require('nconf');
var mongodb = require('mongodb');
var client = mongodb.MongoClient;

// Initialize configuration.
nconf.argv()
  .env()
  .file({file: './backend/app/config.json' });

  var debugging = nconf.get('debug');

  /** Create the uri object to be used to create the connection */
      var uri = null;
      var values = nconf.get('db_selected');
  
      if(debugging) {
          console.log("INFORMACION DE DATABASE SELECCIONADA: ");
          console.log(values);
      }
  
      var dbs_data = nconf.get('dbs:' + values);
  
      if(debugging){
          console.log("INFORMACIÓN DATOS DE DATABASE SELECCIONADA: ");
          console.log(dbs_data);
          console.log("EL VALOR DEL USER ES: ");
          console.log(dbs_data['USER']);
      }
  
      if(dbs_data['USER']===""){
          uri = util.format('%s://%s:%d/%s',
              dbs_data['PROTOCOL'], dbs_data['HOST'], dbs_data['PORT'], dbs_data['DATABASE']);    
      }else{
          if(debugging) console.log(dbs_data['PROTOCOL']);
          if(dbs_data['PROTOCOL']=='mongodb+srv'){
              uri = util.format('%s://%s:%s@%s/%s',
                  dbs_data['PROTOCOL'], dbs_data['USER'], dbs_data['PASS'], dbs_data['HOST'], dbs_data['DATABASE']);        
          }else{
              uri = util.format('%s://%s:%s@%s:%d/%s',
                  dbs_data['PROTOCOL'], dbs_data['USER'], dbs_data['PASS'], dbs_data['HOST'], dbs_data['PORT'], dbs_data['DATABASE']);
          }
      }
      
console.log(uri);
console.log('\n');

var firstuser = "katmel98@hotmail.com";

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
         *          url  : <string>,
         *          group: <string>,
         *          order; <integer>,
         *          active: <boolean>
         *      }
         *    ]
         *  } 
         * 
         */

        var user = new User(firstuser);
        
        var doc = {
            name : "Auth Docs",
            url  : "docs/static",
            group: "General",
            order: 0,
            active: true
        };
        user.addDocumentationAddress(doc); 

        console.log("User to be created: ");
        console.log(user);

        /** Insert the first user into database */
        var dbo = database.db("authdoc");
        
        /** Check if the user is created in the database */
        dbo.collection("users").findOne({"name":firstuser}, function(err, result){

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