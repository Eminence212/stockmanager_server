const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Commands extends Model {
    static associate(models) {
      // define association here
      Commands.belongsTo(models.Status, {
        foreignKey: "statusId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Commands.belongsTo(models.Customers, {
        foreignKey: "customerId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Commands.hasMany(models.Distributions, {
        foreignKey: "commandId",
      });
      Commands.hasMany(models.Invoices, {
        foreignKey: "commandId",
      });
    }
  }
  Commands.init(
    {
      dateCommand: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Commands",
    }
  );
  return Commands;
};
