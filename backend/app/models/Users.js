class User {

    /** Constructor creator. Receives only one parameter: "name" */
    constructor (name){
        this.name = name
        this.documentation = [];
    }

    /** Method to add documentation object into array of authorized selections for the user */
    addDocumentationAddress (documentation) {
        this.documentation.push(documentation);
    }

    /** Method to return the list of documentations assigned to user */
    showDocumentationAddresses (){
        return this.documentation;
    }
}

module.exports = User;