# MovieRatingApp

# Description
A simple app where users can register and log in to post reviews on movies. Users can also
comment and like other users’ reviews. Made using Node/express backend, React.js frontend and
MongoDB as the database. Styling done with MaterialUI. I used the project as an opportunity to
learn some common testing frameworks, so the test-files are also included in the project.

# Running and testing the app

1. To run the app, you need to set up an env. -file to the root of the backend directory. This
env. -file should include your MongoDB URI and a secret for token generation. The secret
can be any random string. For MongoDB I used the free version on MongoDB Atlas
while developing. You can also use MongoDB locally. For more info on how to set up a free
cluster on MongoDB Atlas visit https://www.mongodb.com/docs/atlas/tutorial/deployfree-tier-cluster/
2. Run npm install in backend and frontend directories to install the dependencies.
3. Run npm start in backend and frontend directories to start the application.

# .env template:

MOGODB_URI=

PORT=

SECRET=
