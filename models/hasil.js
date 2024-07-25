'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hasil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Hasil.init({
    id_user: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    sekolah: DataTypes.STRING,
    kanan: DataTypes.INTEGER,
    kiri: DataTypes.INTEGER,
    hasil: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hasil',
    tableName: 'view_hasil',
    timestamps: false,
  });
  return Hasil;
};