const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Currencies extends Model {
    static associate(models) {
      // define association here
      Currencies.hasMany(models.Rates, {
        foreignKey: "currencieId",
      });
    }
  }
  Currencies.init(
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Currencies",
    }
  );
  return Currencies;
};
