const Comment = require('./Comment');
const Favorite = require('./Favorite');
const Houseplant = require('./Houseplant');
const Photo = require('./Photo');
const PostComment = require('./PostComment');
const PlantPhoto = require('./PlantPhoto')
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
Post.belongsToMany(Comment, {
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

// User has many houseplants through favorites
User.belongsToMany(Houseplant, {
    through: {
        model: Favorite,
    },
    as: 'user-houseplants'
})

// Housplant belongs to many users through favorites
Houseplant.belongsToMany(User, {
    through: {
        model: Favorite,
    },
    as: 'houseplant-users'
})

// houseplant has one plantphoto
Houseplant.hasOne(PlantPhoto, {
    foreignKey: 'plant_id',
})

// plantphoto belongs to houseplant
PlantPhoto.belongsTo(Houseplant, {
    foreignKey: 'plant_id',
})

module.exports = {
    Comment,
    Favorite,
    Houseplant,
    PlantPhoto,
    Photo,
    PostComment,
    Post, 
    User,
}
