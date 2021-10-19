const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Famille extends Model {
    static associate(models) {
      // define association here
      Famille.hasMany(models.Article, {
        foreignKey:'familleId',
      })
    }
  }
  Famille.init(
    {
      libelle_famille: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Famille",
    }
  );
  return Famille;
};
