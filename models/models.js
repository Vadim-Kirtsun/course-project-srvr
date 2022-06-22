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

const AddFieldSet = sequelize.define('add_field_set', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false}
})

const AddField = sequelize.define('add_field', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Item = sequelize.define('item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const ItemTag = sequelize.define('item_tag', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false}
})

const Tag = sequelize.define('tag', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Comment = sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    text: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Like = sequelize.define('like', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false}
})

User.hasMany(Collection)
Collection.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

Collection.hasMany(Item)
Item.belongsTo(Collection)

Collection.hasMany(AddFieldSet)
AddFieldSet.belongsTo(Collection)

AddFieldSet.hasMany(AddField)
AddField.belongsTo(AddFieldSet)

AddField.hasMany(Type)
Type.belongsTo(AddField)

Item.hasMany(Comment)
Comment.belongsTo(Item)

Tag.hasMany(ItemTag)
ItemTag.belongsTo(Tag)

Item.belongsToMany(Tag, {through: ItemTag})
Tag.belongsToMany(Item, {through: ItemTag})

User.belongsToMany(Item, {through: Like})
Item.belongsToMany(User, {through: Like})

module.exports = {
    User,
    Collection,
    AddFieldSet,
    AddField,
    Type,
    Item,
    ItemTag,
    Tag,
    Comment,
    Like
}