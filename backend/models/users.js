const { Model } = require("objection");
const Knex = require("knex");

class Users extends Model {
  static get tableName() {
    return "users";
  }

}

module.exports = Users;
