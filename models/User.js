const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');
// password scrambler
const bcrypt = require('bcrypt');


class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        // you have to put something in
        allowNull: false,
        //this field is the primary key for the model.
        primaryKey: true,
        //adds 1 to each input
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        // you have to put something in
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        // you have to put something in
        allowNull: false,
        // tenght of the password
        validate: {
            len:{
                args:[4,32],
                msg: "String length is not in this range"
            }
        }
    }
},
{
    hooks: {
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        }
    },
    sequelize,
    // no time stamp
    timestamps: false,
     //You can stop the auto-pluralization performed by Sequelize
    freezeTableName: true,
    //This also applies to foreign keys automatically generated by associations and other automatically generated fields.
    underscored: true,
    modelName: 'user'
})

//can use user in other files
module.exports = User;