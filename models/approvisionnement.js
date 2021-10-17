const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Approvisionnement extends Model {
    static associate(models) {
      // define association here
      Approvisionnement.belongsTo(models.Fournisseur, {
        foreignKey: "fournisseurId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Approvisionnement.belongsTo(models.Article, {
        foreignKey: "articleId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Approvisionnement.belongsTo(models.Fournisseur, {
        foreignKey: "fournisseurId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Approvisionnement.belongsTo(models.Unite, {
        foreignKey: "uniteId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Approvisionnement.init(
    {
      date_approvisionnement: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      folio: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      quantite_approvisionnee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      prix_achat: {
        type: DataTypes.FLOAT(24, 6),
        allowNull: false,
        defaultValue: 0.0,
      },
      articleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fournisseurId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      uniteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Approvisionnement",
    }
  );
  return Approvisionnement;
};
