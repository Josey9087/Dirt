const Comment = require('./Comment');
const Wishlist = require('./Wishlist');
const Houseplant = require('./Houseplant');
const Photo = require('./Photo');
const Post = require('./Post');
const User = require('./User');

// User has many posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

// Posts belong to user
Post.belongsTo(User, {
    foreignKey: 'user_id',
})

// Post has one Photo
Post.hasOne(Photo, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
})

// Photo belongs to post
Photo.belongsTo(Post, {
    foreignKey: 'post_id',
})

// Posts have many comments through postcomments
Post.hasOne(Comment, {
    foreignKey: 'post_id',
})

// Comments belong to post through postcomments
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
})

// User has many houseplants through favorites
// User.belongsToMany(Houseplant, {
//     through: {
//         model: Wishlist,
//     },
//     as: 'user-houseplants'
// })

// // Housplant belongs to many users through favorites
// Houseplant.belongsToMany(User, {
//     through: {
//         model: Wishlist,
//     },
//     as: 'houseplant-users'
// })

module.exports = {
    Comment,
    Wishlist,
    Houseplant,
    Photo,
    Post, 
    User,
}
