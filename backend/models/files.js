const { Model } = require("objection");
const Users = require("./users");

class Files extends Model {
  static get tableName() {
    return "files";
  }

  static get relationMappings() {
    return {
      relation: Model.BelongsToOneRelation,
      modelClass: Users,
      join: {
        from: "files.user_id",
        to: "users.id",
      },
    };
  }
}

module.exports = Files;
