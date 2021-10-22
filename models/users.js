'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // define association here
    }
  };
  Users.init({
   name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue:
          "https://res.cloudinary.com/eminence/image/upload/v1634481360/avatar/421-4212341_default-avatar-svg-hd-png-download_miwlsi.png",
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0 //0 : client, 1: admin , 2 : caisse & facturation , 3 : Livraison
      },
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};