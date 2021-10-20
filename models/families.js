const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class families extends Model {
    static associate(models) {
      // define association here
      families.hasMany(models.Articles, {
        foreignKey: "familyId",
      });
    }
  }
  families.init(
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Families",
    }
  );
  return families;
};
