const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mouvement_stock extends Model {
    static associate(models) {
      // define association here
      Mouvement_stock.belongsTo(models.Article, {
        foreignKey: "articleId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Mouvement_stock.init(
    {
      date_entree: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      stock_entree: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      articleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Mouvement_stock",
    }
  );
  return Mouvement_stock;
};
