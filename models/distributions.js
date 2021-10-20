const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Distributions extends Model {
    static associate(models) {
      // define association here
      Distributions.belongsTo(models.Commands, {
        foreignKey: "commandId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Distributions.belongsTo(models.Articles, {
        foreignKey: "articleId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Distributions.init(
    {
      dateDescription: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      quantityDistributed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      commandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      articleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Distributions",
    }
  );
  return Distributions;
};
