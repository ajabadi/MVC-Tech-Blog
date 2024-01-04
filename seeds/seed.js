const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models'); // Import Comment model

const userData = require('./userData.js');
const postData = require('./postData.json');
const commentData = require('./commentData.json'); // Import comment data

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const users = await User.findAll();
    const posts = postData.map(post => ({
        ...post,
        userId: users.find(user => user.username === post.username).id,
    }));

    await Post.bulkCreate(posts);

    // Seed comments
    const comments = commentData.map(comment => ({
        ...comment,
        userId: users.find(user => user.username === comment.username).id
    }));

    await Comment.bulkCreate(comments); // Seed Comment model with comments array

    process.exit(0);
};

seedDatabase();
