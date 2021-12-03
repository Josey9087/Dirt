const sequelize = require('../config/connection');
const { User, PlantPhoto, Houseplant, Comment, Post, PostComment, Photo } = require('../models');

const userData = require('./users.json');
const plantData = require('./plants.json')
// const postData = require('./posts.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Houseplant.bulkCreate(plantData, {
    individualHooks: true,
    returning: true,
  })



//   for (const post of postData) {
//     await Post.create({
//       ...post,
//       user_id: users[Math.floor(Math.random() * users.length)].id,
//     });
//   }

  process.exit(0);
};

seedDatabase();