const Comment = require('./Comment');
const Favorite = require('./Favorite');
const Houseplant = require('./Houseplant');
const Photo = require('./Photo');
const PostComment = require('./PostComments');
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
Post.hasMany(Comment, {
    through: {
        model: PostComment,
    },
    as: 'post-comment',
    onDelete: 'CASCADE',
})

// Comments belong to post through postcomments
Comment.belongsTo(Post, {
    through: {
        model: PostComment,
    },
    as: 'comment-post'
})

// User has many Favorites
User.hasMany(Favorite, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

// Favorite belongs to user
Favorite.belongsTo(User, {
    foreignKey: 'user_id',
})

// User has many houseplants through favorites
User.hasMany(Houseplant, {
    through: {
        model: Favorite,
    },
    as: 'user-houseplants'
})

// Housplant belongs to many users through favorites
Houseplant.belongsToMany(Favorite, {
    through: {
        model: Favorite,
    },
    as: 'houseplant-users'
})
// favorite has one houseplant
Favorite.hasOne(Houseplant, {
    foreignKey: 'houseplant_id',
})
// housplant belongs to many favorites
Houseplant.belongsToMany(Favorite, {
    foreignKey: 'houseplant_id',
})

module.exports = {
    Comment,
    Favorite,
    Houseplant,
    Photo,
    PostComment,
    Post, 
    User,
}
