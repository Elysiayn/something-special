const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Text extends Model {}

Text.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    chat_text: {
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            len: [4, 160]
    },
    chat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'chat',
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
}
},
{
    sequelize, 
    freezeTableName: true,
    underscored: true,
    modelName: 'chat'
}
);

module.exports = Text;