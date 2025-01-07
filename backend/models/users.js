const { Model } = require("objection");
const Files = require("./files");

class Users extends Model {
  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    return {
      relation: Model.HasManyRelation,
      modelClass: Files,
      join: {
        from: "users.id",
        to: "files.user_id",
      },
    };
  }
}

module.exports = Users;
