const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

// sql
class Post extends Model {}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        // needs to be filled in
        allowNull: false,
        //this field is the primary key for the model.
        primaryKey: true,
        //adds 1 to each input
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        // needs to be filled in
        allowNull: false,
        //you can only have one title
        validate: {
            len: [1]
        }
    },
    content: {
        type: DataTypes.STRING,
        // needs to be filled in
        allowNull: false,
        // you can only have one content
        validate: {
            len: [1]
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            // the user_id would be posted
            model: 'user',
            key: 'id'
        }
    }
}, {
    sequelize,
    //You can stop the auto-pluralization performed by Sequelize
    freezeTableName: true,
    //This also applies to foreign keys automatically generated by associations and other automatically generated fields.
    underscored: true,
    modelName: 'post'
})

//can use post in a differnt file
module.exports = Post;