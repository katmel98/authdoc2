# **Authdoc2** 

    (DEVELOPMENT IN PROGRESS ...)

This package represents an approach of a documentation system using Daux.io BUT allowing user management using the Auth0 utility.

## **Components and Requirements**  

1. **_Auth0_**
1. **_NodeJS_** (Javascript Runtime Framework)
1. **_ExpressJS_** (Backend tool to integrate required info to allow the Auth0 integration)
1. **_Angular2_** (JS Framework to create the frontend)
1. **_Daux.io_** (Markdown documentation server)
1. **_MongoDB_** (as DBMS to store the users info to allow the correct redirection once loggedin)  

## **Project Directory Structure**

    authdocs2  
    +-- backend  
    |   +-- app
    |   |   +-- db
    |   |   +-- models
    |   |   |   +-- Users.js
    |   |   +-- config.json
    |   |   +-- config.json.EXAMPLE
    |   +-- resources
    |   |   +-- initdb.js
    +-- frontend  
    |   +-- dist
    |   |   +-- ...
    |   +-- e2e
    |   |   +-- ...
    |   +-- node_modules
    |   |   +-- ...
    |   +-- src
    |   |   +-- ...
    |   +-- .angular-cli.json
    |   +-- .editorconfig
    |   +-- .gitignore
    |   +-- karma.conf.js
    |   +-- package-lock.json
    |   +-- package.json
    |   +-- protractor.conf.js
    |   +-- README.md
    |   +-- tsconfig.json
    |   +-- tslint.json
    +-- node_modules
    |   +-- ...
    +-- .gitignore  
    +-- LICENSE  
    +-- package-lock.json  
    +-- package.json  
    +-- README.md  
    +-- server.js  

The structure explanation:

* __backend__: this directory contains any backend resource created for support the _server.js_ script. 
* __frontend__: an Angular2+ project directory, contains all the code necessary to create the frontend to allow a loggedin user select any of the assigned documentation to his profile.
* __node_modules__: support packages for the app
* __.gitignore__: git file that configures what files will be ignored when upload data to repository.
* __LICENSE__: this package is MIT licensed.
* __package-lock.json__: nodejs locking file, it's required to lock the update process of the package.json file.
* __package.json__: nodejs configuration file with information for manage dependencies and orchestation tasks.
* __README.md__: documentation file.
* __server.js__: software initialization script.  

## **INSTALLATION PROCESS**

### **_AUTH0_**

1. Create an account in **_[Auth0](https://auth0.com)_** service (could be a free one).
1. Obtain the data required to allow the connection between the Auth0 service and Authdoc2:  

    * AUTH0_DOMAIN
    * AUTH0_CLIENT_ID
    * AUTH0_CLIENT_SECRET

1. It is required to create a SESSION_SECRET and configure the value as the param to identify the sessions between platforms. This value can be any random generated value.

### **_AUTHDOC2_**  

1. Clone the project in your prefered directory:  
**`git clone https://github.com/katmel98/authdoc2.git`**  
1. Get into authdoc2 documentation directory:  
**`cd authdoc2`**
1. Install all packages requirements:  
**`npm install`**
1. Create a new _config.json_ file from _config.json.EXAMPLE_:  
**`cp backend/app/config.json.EXAMPLE backend/app/config.json`**
1. Configure the file following filling attributes with your desired values.

### **_ANGULAR2+_**  

1. Install globally Angular-cli:  
**`npm install -g @angular/cli`**
1. Get into frontend directory:  
**`cd frontend`**
1. Install all Angular requirements:  
**`npm install`**
1. Build the distribution directory:  
**`ng build`**

### **_DAUX.IO_**  

**_[Daux.io](https://dauxio.github.io)_** is a documentation generator that uses a simple folder structure and Markdown files to create custom documentation on the fly. It helps you create great looking documentation in a developer friendly way.

It allows you to create a static content from Markdown documentation. You can generate n-number of documentations with this tool, it'll be necessary to take the static content into a root directory predefined that will has the different documentations in it and will work as documentation's origin folder.

### **_MONGODB_**

MongoDB is the DBMS selected to manage the user/documentation assignment. This database could be a localhost installation or a cloud installation. In order to use the database, a script _"initdb.js"_ is provided.

1. Execute the _"initdb.js"_ script:  
**`node backend/resources/initdb.js`**  

1. Check data generated in your MongoDB instance.  

1. Create users and relations in __User Collection__, using the following structure:  
    * __name__: (_type: String_) user email used as login username in the Auth0 service.
    * __documentation__: (_type: Array_) Object's array to identify all the documentations related to an user ...

        * __Element__: (_type: Object_)  

            * _**name**_: (_type: String_) title to be used in order to identify the documentation.  
            * _**url**_: (_type: String_) the independent route where the documentation resides in the documentation root directory.  
            * _**group**_: (_type: String_) group name to be used in order to allow different documentations to be organized.  
            * _**order**_: (_type: Number_) order to be used when creating a dropdown to allow the user select documentation to be read.  
            * _**active**_: (_type: Boolean_) this parameter indicates if the documentation will be accesible to the user.  

