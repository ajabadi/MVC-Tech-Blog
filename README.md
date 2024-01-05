# Model-View-Controller-Tech-Blog

## Description 

This project is all about creating a CMS-style blog site, akin to Wordpress, designed specifically for developers. Here, you can share your insights, articles, and thoughts on various technical topics. This application is built from scratch and deployed on Heroku, adhering to the Model-View-Controller (MVC) architectural paradigm.

## Key features include

First Visit:

- Homepage Presentation: View existing blog posts, navigation links to homepage, dashboard, and login option.
- Navigation: Links to different sections of the site.
  
Account Management:

- Sign Up: Create a new account with username and password.
- Sign In: Log in with existing credentials.
- Stay Signed In: Session management for returning users.

Blog Interaction:

- View Posts: Access posts with titles, content, author, and creation date.
- Commenting: Ability to leave comments on posts.
- Dashboard Access: View and manage your own blog posts.

Blog Post Management:

- Create New Post: Add new blog posts with title and content.
- Edit/Delete Posts: Update or remove your blog posts.
- Auto Logout: Automatic sign-out after being idle for a set time.
  
Technical Requirements

- MVC Architecture: Follow the Model-View-Controller design.
- Templating Language: Use Handlebars.js.
- ORM: Implement Sequelize for database management.
- Authentication: Utilize express-session npm package.
  
## User Story 
As a tech enthusiast and developer, I want a CMS-style blog site, So that I can publish articles, blog posts, and share my opinions and thoughts.

## Getting Started 

### Prerequisites

- express-handlebars for Views.
- MySQL2 and Sequelize for Models.
- Express.js API for Controllers.
- dotenv for environment variables.
- bcrypt for password hashing.
- express-session and connect-session-sequelize for session management.

### Usage
- Run the application with the command node server.js or npm start.
- Access the application through your web browser.
- Follow the provided user interface to create a user by signing up.
- Create new notes that would be displayed at the home page and your dashboard.
- Add comment to other people's post, your account username and time will be displayed at the comment section.

## Additional Information 
This is the deployed [application](https://t3chbl0g-07c794255588.herokuapp.com)

### Sample of Application
<img width="1091" alt="Screen Shot 2024-01-03 at 21 35 48" src="https://github.com/ajabadi/MVC-Tech-Blog/assets/145517793/850af8e3-f223-4541-b3bf-1d0d347edb00">
