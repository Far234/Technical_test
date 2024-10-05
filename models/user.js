'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate(data,options){
        const salt = bcrypt.genSaltSync(8)
        const hash = bcrypt.hashSync(data.password,salt)

        data.password = hash
      },
      beforeUpdate: async (data,options) => {
        console.log(data.password)
        const hash = await bcrypt.hash(data.password,8)

        data.password = hash
      }
  }
});
  return User;
};