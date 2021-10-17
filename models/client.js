const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {
      // define association here
      Client.hasMany(models.Commande, {
        foreignKey:'clientId'
      })
    }
  }
  Client.init(
    {
      nom: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      contact: {
        type: DataTypes.STRING(50),
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Client",
    }
  );
  return Client;
};
