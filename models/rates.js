const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rates extends Model {
    static associate(models) {
      // define association here
      Rates.belongsTo(models.Currencies, {
        foreignKey: "currencieId",
        onDelete: "CASCADE",
        onUpdate:"CASCADE"
    })
    }
  }
  Rates.init(
    {
      dateRate: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: true,
      },
      value: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      currencieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Rates",
    }
  );
  return Rates;
};
