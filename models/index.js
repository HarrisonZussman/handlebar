// grabbing information from this places
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// user can have multiple posts
User.hasMany(Post, {
    // connected to user
    foreignKey: 'user_id'
})
// user can have multiple comments
User.hasMany(Comment, {
    // connected to user
    foreignKey: 'user_id'
})
// the post can only have one user
Post.belongsTo(User, {
    // connected to user
    foreignKey: 'user_id'
})
// post can have multiple comments
Post.hasMany(Comment, {
    // connected to post
    foreignKey: 'post_id'
})
// the comment can only have one user
Comment.belongsTo(User, {
    // connected to user
    foreignKey: 'user_id'
})
// the comment can only have one post
Comment.belongsTo(Post, {
    // connected to post
    foreignKey: 'post_id'
})

// the information you want to use in other files
module.exports = {
    User,
    Post,
    Comment
};