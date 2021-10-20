const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Units extends Model {
    static associate(models) {
      // define association here
      Units.hasMany(models.Procurements, {
        foreignKey: "unitId",
      });
    }
  }
  Units.init(
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Units",
    }
  );
  return Units;
};
