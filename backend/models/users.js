const {Model} = require('objection')
const Knex = require('knex')

class Users extends Model{
    static get tableName(){
        return 'users';
    }

    static get jsonSchema(){
        return {
            type : 'object',
            // required : [name,email,username,password],
            // properties : {
            //     id : {type : 'integer'},
            //     name : {type : 'string', MinLength : 1,MaxLength: 20 },
            //     email : {type : 'string',MaxLength:50},
            //     username : {type: 'string',MaxLength:20},
            //     password : {type: 'string',MaxLength:20}

            // }
        }
    }

}

module.exports = Users