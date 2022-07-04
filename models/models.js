const  sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    blocked: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER", allowNull: false}
})

const Collection = sequelize.define('collection', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    subject: {type: DataTypes.STRING, allowNull: false},
    image: {type: DataTypes.STRING, allowNull: true}
})

const AddField = sequelize.define('add_field', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    type: {type: DataTypes.STRING, allowNull: false}
})

const AddFieldValue = sequelize.define('add_field_value', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    value: {type: DataTypes.STRING, allowNull: false}
})

const Item = sequelize.define('item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false}
})

const ItemTag = sequelize.define('item_tag', {})

const Tag = sequelize.define('tag', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Comment = sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    text: {type: DataTypes.STRING, allowNull: false}
})

const Like = sequelize.define('like', {})

User.hasMany(Collection)
Collection.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

Collection.hasMany(Item)
Item.belongsTo(Collection)

Collection.hasMany(AddField)
AddField.belongsTo(Collection)

Item.hasMany(Comment)
Comment.belongsTo(Item)

Item.hasMany(AddFieldValue)
AddFieldValue.belongsTo(Item)

Item.hasMany(Like)
Like.belongsTo(Item)

User.hasMany(Like)
Like.belongsTo(User)

Item.belongsToMany(Tag, {through: ItemTag})
Tag.belongsToMany(Item, {through: ItemTag})

Item.belongsToMany(AddField, {through: AddFieldValue})
AddField.belongsToMany(Item, {through: AddFieldValue})

User.belongsToMany(Item, {through: Like})
Item.belongsToMany(User, {through: Like})

module.exports = {
    User,
    Collection,
    AddField,
    AddFieldValue,
    Item,
    ItemTag,
    Tag,
    Comment,
    Like
}