const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    static associate(models) {
      // define association here
      Status.hasMany(models.Commands, {
        foreignKey:"statusId"
      })
     
    }
  }
  Status.init(
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Status",
    }
  );
  return Status;
};
