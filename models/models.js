const  sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    user_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    user_name: {type: DataTypes.STRING, unigue: true, allowNull: false},
    email: {type: DataTypes.STRING, unigue: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    blocked: {type: DataTypes.BOOLEAN, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER", allowNull: false}
})

const Collection = sequelize.define('collection', {
    collection_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    collection_name: {type: DataTypes.STRING, unigue: true, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    image: {type: DataTypes.STRING, allowNull: true}
})

const Subject = sequelize.define('subject', {
    subject_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    subject_name: {type: DataTypes.STRING, unigue: true, allowNull: false}
})

const AddFieldSet = sequelize.define('add_field_set', {
    set_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false}
})

const AddField = sequelize.define('add_field', {
    subject_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    subject_name: {type: DataTypes.STRING, unigue: true, allowNull: false}
})

const Type = sequelize.define('type', {
    type_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    type_name: {type: DataTypes.STRING, unigue: true, allowNull: false}
})

const Item = sequelize.define('item', {
    item_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    item_name: {type: DataTypes.STRING, unigue: true, allowNull: false}
})

const ItemTag = sequelize.define('item_tag', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false}
})

const Tag = sequelize.define('tag', {
    tag_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    tag_name: {type: DataTypes.STRING, unigue: true, allowNull: false}
})

const Comment = sequelize.define('comment', {
    comment_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    comment_text: {type: DataTypes.STRING, unigue: true, allowNull: false}
})

const Like = sequelize.define('like', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false}
})

User.hasMany(Collection)
Collection.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

Collection.hasMany(Subject)
Subject.belongsTo(Collection)

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
    Subject,
    AddFieldSet,
    AddField,
    Type,
    Item,
    ItemTag,
    Tag,
    Comment,
    Like
}