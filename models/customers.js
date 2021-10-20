const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class customers extends Model {
    static associate(models) {
      // define association here
      customers.hasMany(models.Commands, {
        foreignKey: "customerId",
      });
    }
  }
  customers.init(
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      contact: {
        type: DataTypes.STRING(15),
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Customers",
    }
  );
  return customers;
};
