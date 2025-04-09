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



### Data Flow

Diagram: System Architecture ![System Architecture](./C:\Users\Windows\Desktop\cw\Advanced_serverside_coursework-1\images\image.png)


+-------------+       HTTP        +----------------+       SQL       +-----------+
|   React.js  |  <------------->  |  Node.js API   |  <----------->  |  MySQL DB |
|   Frontend  |                   |   Backend      |                 |           |
+-------------+                   +----------------+                 +-----------+
         |                             |   ^                                |
         | JWT Auth                    |   | Sequelize ORM                  |
         +-----------------------------+   +--------------------------------+


# System Architecture
Below is a high-level architecture diagram that shows how the different components interact:
pgsql
CopyEdit
   +------------------+         +---------------------+         +---------------------+
    |   React Frontend |  <--->  |   Node.js Backend   |  <--->  |   MySQL Database    |
    +------------------+         +---------------------+         +---------------------+
    |  - User Interface|         |  - API Endpoints    |         |  - Data Storage     |
    |  - Displays Data |         |  - Business Logic   |         |  - Tables (Users,   |
    |  - API Requests  |         |  - Controllers      |         |    Products, etc.)  |
    |  - User Actions  |         |  - Middleware       |         |  - Queries (CRUD)   |
    +------------------+         +---------------------+         +---------------------+
              ^                            |                              |
              |                            |                              |
              +----------------------------+------------------------------+
                                         |
                                      JWT Authentication
                                    (Token-based Security)
# Environment Variables
Backend .env

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=1h
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

# Docker Container Diagram
You can include a container-based diagram like:
diff
CopyEdit
+------------------------+
|     React Frontend     |  → Port 3000
+------------------------+
| Docker Container: react|
+------------------------+

+------------------------+
|    Node.js Backend     |  → Port 5000
+------------------------+
| Docker Container: api  |
+------------------------+

+------------------------+
|       MySQL DB         |  → Port 3306
+------------------------+
| Docker Container: mysql|
+------------------------+

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


🧱 2. api_keys Table
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

