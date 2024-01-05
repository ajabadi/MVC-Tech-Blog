require('dotenv').config();
const path = require('path');
const express = require('express');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection')
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

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
   
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}!`);
        });
});


