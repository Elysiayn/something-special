const Category = require('./Category');
const Message = require('./Message');
const Post = require('./Post');
// const Upload = require('./Upload');
const User = require('./User');
const Tags = require('./Tags');

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.belongsTo(Category, {
    foreignkey: 'category_id'
});

Category.hasMany(Post, {
    foreignKey: 'category_id'
});

Post.hasMany(Message, {
    foreignKey: 'post_id'
});

Message.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Message, {
    foreignKey:'user_id'
});

Message.belongsTo(User, {
    foreignKey: 'user_id'
});

// NEED TO ADD ASSOCIATIONS FOR TAGS
Tags.belongsToMany(Post, {
    foreignKey: 'post_id'
});

Post.belongsToMany(Tags, {
    foreignKey: 'tags_id'
});

module.exports = { Category, Message, Post, User, Tags };
