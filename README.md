#  Full-Stack Application: React + Node.js + MySQL (with Docker Support)

##  Project Overview

This project is a full-stack web application that demonstrates the integration of a React frontend, Node.js backend, and MySQL database. It includes secure user authentication via JWT, RESTful API design, and containerization using Docker for seamless deployment.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js (Express)
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Containerization**: Docker & Docker Compose
- **Others**: Axios, bcryptjs, dotenv, cors

## Key Features

- User Registration & Login (JWT Auth)
- Protected API Endpoints
- MySQL Database Integration
- Environment-based Configurations
- Dockerized Deployment for Full Stack
- MVC Architecture with RESTful APIs

# API Endpoints Overview
- Authentication
 -> POST /register – Register a new user account
 -> POST /login – Authenticate user and receive a JWT token

- API Key Management
 -> POST /generate-api-key – Generate an API key (requires JWT token)
 -> GET	/verify-api-key	- Validates if an API key is valid

- Country Data
 -> GET /country-data?name={countryName} – Fetch country details (requires JWT token)

 # Session Management
- This application uses JWT (JSON Web Tokens) for secure session handling:

- Upon successful login, a JWT token is issued by the backend and stored in the browser's localStorage.

- The token is automatically attached to all subsequent requests using an Axios interceptor (Authorization: Bearer <token>).

- Protected routes like API Key generation and Country Data access require a valid token to be accessed

# Security Protection
- The application includes several layers of security to protect user data and access:

- JWT-Based Authentication: Ensures only authenticated users can access protected routes.

- Token Storage: Tokens are securely stored in localStorage and attached to requests via Axios interceptor.

- Backend Authorization Middleware: Validates JWT on each request to protected endpoints.

- Password Hashing: User passwords are securely hashed before being stored in the database (using libraries like bcrypt).

- CORS Policy: Configured on the backend to restrict API access from unauthorized domains.

- Input Validation: Backend APIs validate all incoming data to prevent  malformed requests.

- Error Handling: Graceful error messages without exposing sensitive stack traces or internal logic.


# System Architecture
System Architecture
The application follows a full-stack architecture with the following components:

Frontend (React.js):

-Provides the user interface (UI) and handles user interactions.
-Communicates with the backend via HTTP requests.
-Manages JWT tokens for user authentication and session management.

Backend (Node.js API):

-Built with Node.js and Express.js, responsible for handling API requests.
-Implements  processes data, and interacts with the MySQL database.
-Uses JWT authentication middleware to secure protected routes.

Database (MySQL):

-Stores user data, authentication information, and application data.
-Managed using Sequelize ORM for CRUD operations.

Authentication:

JWT tokens are used for secure authentication, ensuring only authenticated users can access protected routes.

Deployment:

The entire application is containerized using Docker for easy deployment across different environments.


# Environment Variables
-Backend .env

- JWT_SECRET=your_secret_key_here
- DB_HOST=localhost
- DB_USER=root
- DB_PASSWORD=1234
- DB_NAME=user_registration_db
- PORT=5000

- DB_HOST, DB_USER, DB_PASSWORD, DB_NAME: Your MySQL database connection details.
- JWT_SECRET: A secret key for signing JWT tokens.
- JWT_EXPIRATION: Token expiration time.
- PORT: The port on which the server will run.


# Key Design Patterns
# MVC Pattern (Model-View-Controller):

The application follows the MVC pattern to separate concerns:

- Model: Represents the data structure (i.e., the database schema).
- View: The React frontend represents the view that the user interacts with.
- Controller: The Node.js backend (Express) acts as the controller that handles incoming requests, processes them, and updates the view (frontend).


# RESTful API:

The backend exposes a set of RESTful APIs to handle client-server communication. 

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

Database:
MySQL stores:
Users (username, password hash)
API keys (unique, time-based, user-specific)

# Patterns 
MVC:
Models: Sequelize models for User, APIKey
Views: (Handled by React frontend)
Controllers: Route handlers
JWT Authentication: Ensures only logged-in users access their API keys


# RESTful API Design: 
Clear route separation and stateless operations

# Docker Container 
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
Two main tables:
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

 # API Key Generation
- API keys are generated server-side using a cryptographically secure random string (e.g., using uuid or crypto).

- Endpoint: POST /generate-api-key

- Only authenticated users can generate an API key after logging in.

- Once generated, the key is hashed and stored securely in the database along with the user’s ID.

📦 How It Is Stored
- API keys are not stored in plain text.

- Instead, they are hashed using a one-way hashing algorithm (e.g., SHA256 or bcrypt).

- Only the hashed value is stored to ensure protection in case of data breaches.

🧾 How It Is Authenticated
- For API calls, users include their API key in the request header:

x-api-key: YOUR_API_KEY

- On the server, the incoming key is hashed and compared with the stored hash.

- If the key is valid and active, the request is allowed.

🚫 Key Security & Revocation
- Each user can have only one active API key at a time.

- Users can regenerate or revoke their API key at any time.

- Expired or revoked keys are immediately rejected by the server.

# Authentication System 

- User Registration: New users can sign up with validation checks (e.g., unique email).

- User Login: Users log in with credentials, and receive a JWT (JSON Web Token) for session handling.

- JWT-Based Sessions:
- After login, a JWT is stored in localStorage.

- Token is attached to all authenticated API requests.

- Protected Routes: Only authenticated users can access API key generation and country data endpoints.

# API Key Management
The application implements a secure API Key Management system to regulate access to protected endpoints.
-  Generation:
Authenticated users can generate a unique API key via the /generate-api-key endpoint.

API keys are generated using a secure random string generator (e.g., UUID or crypto-random).

Users can only have one active API key at a time.

- Storage:
API keys are stored securely in the backend database.

Keys are typically hashed or encrypted before storage for added protection (e.g., using bcrypt or SHA-256).

Each key is associated with a user ID for validation and rate-limiting.

- Authentication:
When accessing protected endpoints (e.g., /country-data), the API key must be included in the request headers:
Authorization: ApiKey <your-api-key>

The backend validates:
- If the key exists.
- If it belongs to a registered user.
- If it hasn't been revoked or expired (if applicable).
- Invalid or missing keys result in a 401 Unauthorized error.

🔄 Regeneration 
- Users can regenerate keys through the dashboard .
- Old keys are invalidated immediately upon regeneration.

# API Key Authentication and Management
# API Key Authentication
The system uses API Key Authentication to secure specific endpoints, such as those that access external services (like country data). API keys are generated for each user upon registration, and they must be included in the request headers to authenticate access to protected resources.

- How API Key Authentication Works:

- API Key Generation:

When a user registers or logs in, an API key is generated and stored in the system's database.
The API key is provided to the user and must be included in the request header (Authorization: Bearer <API_KEY>) when making requests to certain endpoints.

- API Key Verification:

Every protected endpoint that requires API key access verifies the API key sent in the request header.
If the API key is valid (exists in the database and is not expired), the user is granted access.
Invalid or missing API keys result in a 403 Forbidden response.

- Usage:

The API key is used to authenticate requests to endpoints that require access to protected resources, such as /country-data.

# API Key Management
API key management ensures that users can generate, manage, and revoke their API keys, offering full control over their access to the system.

- Generate API Key:
API keys are generated when the user logs in or registers and can be regenerated as needed.
The API key is stored securely in the database, hashed for security.

- Revoke/Invalidate API Key:

Users can revoke their API key, invalidating it immediately, which prevents unauthorized access to protected resources.
If a user logs out or changes sensitive account settings, the system will automatically invalidate their API key.

- Security Considerations:

Encryption: API keys are stored securely using encryption and hashing techniques to protect against unauthorized access.

