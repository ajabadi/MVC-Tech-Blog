require('dotenv').config();
const path = require('path');
const express = require('express');
const Sequelize = require('sequelize');
const fs = require('fs');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { User, Post, Comment } = require('./models'); // Adjust the path as necessary

// Initialize Sequelize
let sequelize;
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize('tech_blog_db', 'root', 'ilovecats', {
        host: "localhost",
        dialect: "mysql"
    });
}

// Data export function
async function exportDataToJson() {
    try {
        const users = await User.findAll({ raw: true });
        const posts = await Post.findAll({ raw: true });
        const comments = await Comment.findAll({ raw: true });

        // Define the file paths
        const userDataPath = path.join(__dirname, 'seeds', 'userData.json');
        const postDataPath = path.join(__dirname, 'seeds', 'postData.json');
        const commentDataPath = path.join(__dirname, 'seeds', 'commentData.json');

        // Write the data to JSON files in the specified directory
        fs.writeFileSync(userDataPath, JSON.stringify(users, null, 2));
        fs.writeFileSync(postDataPath, JSON.stringify(posts, null, 2));
        fs.writeFileSync(commentDataPath, JSON.stringify(comments, null, 2));

        console.log('Data exported to JSON files in seeds folder.');
    } catch (error) {
        console.error('Error exporting data:', error);
    }
}

// Create an instance of express
const app = express();
const PORT = process.env.PORT || 3001;

// Set up handlebars with helpers
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set up session with Sequelize store
const sess = {
    secret: 'super secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        checkExpirationInterval: 1000 * 60 * 10, // will check every 10 minutes
        expiration: 1000 * 60 * 30 // will expire after 30 minutes
    })
};
app.use(session(sess));

// Serving static files and parsing requests
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const routes = require('./controllers');
const userRoutes = require('./controllers/api/user-routes');

// User routes
app.use('/api/users', userRoutes);
app.use(routes);

// Sync sequelize, export data to JSON, and start the server
sequelize.sync().then(() => {
    exportDataToJson().then(() => {
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}!`);
        });
    });
});


