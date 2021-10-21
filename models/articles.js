const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Articles extends Model {
    static associate(models) {
      // define association here
      Articles.belongsTo(models.Families, {
        foreignKey: "familyId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Articles.hasMany(models.Procurements, {
        foreignKey: "articleId",
      });
      Articles.hasMany(models.Distributions, {
        foreignKey: "articleId",
      });
      Articles.hasMany(models.Stock_movements, {
        foreignKey: "articleId",
      });
      Articles.hasOne(models.Stocks, {
        foreignKey: "articleId",
      });
        Articles.hasOne(models.Init_stocks, {
          foreignKey: "articleId",
        });
    }
  }
  Articles.init(
    {
      reference: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      designation: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.FLOAT(24, 2),
        allowNull: false,
        defaultValue: 0,
      },
      tva: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      threshold: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      minQuantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      familyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Articles",
    }
  );
  return Articles;
};
