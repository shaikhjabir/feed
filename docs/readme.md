# Project Instructions

This project is built using Node.js and Sequelize as the ORM (Object-Relational Mapping) library. Before starting the project, follow the instructions below to configure your database and run the application.

## before run project migrate the database and seed data where super admin data will be store in user table
## Database Configuration

1. Inside the `migration` folder, update the database configuration. You can find the necessary configuration files in the `config` folder.

2. Execute the following command to create the required tables in your database:
sequelize-cli db:migrate
3. Execute the following command to create the super admin data into table:
sequelize-cli db:seed:all

Ensure that you have `sequelize-cli` installed before running this command. If you haven't installed it yet, run the following command to install it globally:

npm install sequelize-cli -g


3. If you don't have an existing `.env` file in the project root folder, rename the provided `dot.env` file to `.env`. Update the database configuration within the `.env` file with the appropriate values.

4. update the .env file with your database credentials it will be same as migration/config/config.json:development credentials

## Running the Project

1. Navigate to the project folder in your command-line interface.

2. To run the project, use one of the following commands:

npm run start
or
npm run dev



## API Documentation

To understand and utilize the project's API endpoints, refer to the provided Swagger file. The Swagger file contains detailed information about each endpoint, including request and response formats.

## project documentation
after seed the migration one super admin will be created   
## api/v1/user/login
if we login using user credentials it will return jwt token for futher api call we will use token in that api then that api will be treat as that user which token we applied.
## api/v1/user/create
only super admin can create any of number of admin and basic user.
admin can create basic user.
## api/v1/user/update/roleAndPermission
admin can't delete any feed until super admin give permission
## api/v1/feed/add/user
to add list of feed on particular user 
## api/v1/feed/list
super admin can see all feeds
admin can see all those feeds which permission given by super admin.
admin can give permission for feed to see for basic user which admin have have permission on feed.
basic user can see feeds which permission given by super admin and admin.
## api/v1/feed/create
we can create feed.

## api/v1/feed/delete
super admin can delete any feed.
admin can delete only those feeds which permission given by super admin
basic can't delete any feeds



Feel free to reach out if you have any further questions or concerns. Happy coding!
