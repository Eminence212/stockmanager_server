const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Taux_jour extends Model {
    static associate(models) {
      // define association here
      Taux_jour.belongsTo(models.Monnaie, {
        foreignKey: "monnaieId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Taux_jour.init(
    {
      taux: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false,
      },
      date_taux: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      monnaieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Taux_jour",
    }
  );
  return Taux_jour;
};
