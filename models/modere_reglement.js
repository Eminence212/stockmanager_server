const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Modere_reglement extends Model {
    static associate(models) {
      // define association here
      Modere_reglement.hasMany(models.Facture, {
        foreignKey: "reglementId",
      });
    }
  }
  Modere_reglement.init(
    {
      libelle_reglement: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Modere_reglement",
    }
  );
  return Modere_reglement;
};
