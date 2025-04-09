#  Full-Stack Application: React + Node.js + MySQL (with Docker Support)

##  Project Overview

This project is a full-stack web application that demonstrates the integration of a React frontend, Node.js backend, and MySQL database. It includes secure user authentication via JWT, RESTful API design, and containerization using Docker for seamless deployment.

---

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js (Express)
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Containerization**: Docker & Docker Compose
- **Others**: Axios, bcryptjs, dotenv, cors

---

## Key Features

- User Registration & Login (JWT Auth)
- Protected API Endpoints
- MySQL Database Integration
- Environment-based Configurations
- Dockerized Deployment for Full Stack
- MVC Architecture with RESTful APIs



# System Architecture
ystem Architecture
The application follows a full-stack architecture with the following components:

Frontend (React.js):

Provides the user interface (UI) and handles user interactions.

Communicates with the backend via HTTP requests.

Manages JWT tokens for user authentication and session management.

Backend (Node.js API):

Built with Node.js and Express.js, responsible for handling API requests.

Implements business logic, processes data, and interacts with the MySQL database.

Uses JWT authentication middleware to secure protected routes.

Uses Sequelize ORM to interact with the MySQL database.

Database (MySQL):

Stores user data, authentication information, and application data.

Managed using Sequelize ORM for CRUD operations.

Authentication:

JWT tokens are used for secure authentication, ensuring only authenticated users can access protected routes.

Deployment:

The entire application is containerized using Docker for easy deployment across different environments.
# Environment Variables
Backend .env

JWT_SECRET=your_secret_key_here
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=1234
DB_NAME=user_registration_db
PORT=5000

DB_HOST, DB_USER, DB_PASSWORD, DB_NAME: Your MySQL database connection details.


JWT_SECRET: A secret key for signing JWT tokens.


JWT_EXPIRATION: Token expiration time.


PORT: The port on which the server will run.
Key Design Patterns
MVC Pattern (Model-View-Controller):


The application follows the MVC pattern to separate concerns:


Model: Represents the data structure (i.e., the database schema).


View: The React frontend represents the view that the user interacts with.


Controller: The Node.js backend (Express) acts as the controller that handles incoming requests, processes them, and updates the view (frontend).


# RESTful API:


The backend exposes a set of RESTful APIs to handle client-server communication. These APIs allow for CRUD operations (Create, Read, Update, Delete) and are accessible via standard HTTP methods (GET, POST, PUT, DELETE).


Example endpoints:


GET /api/users: Retrieves a list of users from the database.


POST /api/users: Creates a new user in the database.


PUT /api/users/:id: Updates a user's details.


DELETE /api/users/:id: Deletes a user.


JWT Authentication:


JWT is used to secure the application by ensuring that only authenticated users can access certain resources. When the user logs in, they receive a JWT that must be included in the Authorization header for subsequent requests.


The backend validates the JWT on each request to ensure that it is valid and corresponds to an authenticated user.


Flow Explanation
Frontend:


Built in React


Sends HTTP requests to backend API using fetch or axios


Handles JWT in localStorage


Backend:


Built with Node.js + Express


Implements REST API


Auth via JWT


Interacts with MySQL via Sequelize ORM


Database:


MySQL stores:


Users (username, password hash)


API keys (unique, time-based, user-specific)
Patterns Highlighted
MVC:


Models: Sequelize models for User, APIKey


Views: (Handled by React frontend)


Controllers: Express route handlers


JWT Authentication: Ensures only logged-in users access their API keys


RESTful API Design: Clear route separation and stateless operations

Docker Container Diagram
The application utilizes Docker to containerize its components for easy deployment and scalability. Below is an overview of the container setup:

React Frontend Container:

The React frontend is running in a Docker container, which is exposed on Port 3000.

This container handles the user interface and communicates with the backend API.

Docker Container: react

Node.js Backend Container:

The Node.js backend (Express API) runs in a separate Docker container, exposed on Port 5000.

It handles API requests, authentication, and interaction with the database.

Docker Container: api

MySQL Database Container:

The MySQL database is also containerized, running on Port 3306.

It stores application data such as user information and any other relevant data.

Docker Container: mysql

These containers interact with each other through Docker networking, providing an isolated and manageable environment for the application.

# Database Overview
 two main tables:
users and api_keys tables

 1. users Table
Field
Type
Description
id        INT (PK)  Primary Key
username  VARCHAR   Unique username
email     VARCHAR   Unique email
password_hash  VARCHAR   Hashed password
created_at   TIMESTAMP   Auto timestamp


 2. api_keys Table
Field      Type           Description
id         INT (PK)        Primary Key
key        VARCHAR         Generated API Key
user_id    INT (FK)       Foreign key to users.id
created_at TIMESTAMP      When the key was created
expires_at  TIMESTAMP     Expiry time (optional)
is_active   BOOLEAN        Whether key is currently active


🔹 3NF (Third Normal Form)
No transitive dependencies (i.e., no field depends on another non-primary key field).


Example: user_id is a foreign key, and no other field in api_keys depends on user fields like email,
This schema is in 3NF.
It's clean, relational, and avoids redundancy  which helps ensure data consistency and integrity.

