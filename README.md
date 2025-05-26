# SkillSync Backend

SkillSync backend is a Node.js-based RESTful backend for a skill management and user authentication platform. It handles secure user registration, login, profile management, and skill tracking via RESTful APIs using Express, MongoDB, and JWT.

## Tech Stack

- **Node.js** – JavaScript runtime for server-side logic
- **Express.js** – Minimalist web framework for building RESTful APIs
- **MongoDB** – NoSQL database for storing user data and skills
- **Mongoose** – ODM for MongoDB to structure and validate data models
- **JWT (jsonwebtoken)** – Secure user authentication via tokens
- **bcryptjs** – Password hashing to ensure credential security
- **dotenv** – Manages environment-specific configurations
- **CORS** – Enables cross-origin resource sharing for frontend communication

## Folder Structure

The project is structured to ensure scalability and separation of concerns:
```
SkillSync/
├── controllers/           # Business logic for authentication
│   └── authController.js
│
├── middleware/            # JWT authentication middleware
│   └── authMiddleware.js
│
├── models/                # Mongoose schema definitions
│   └── User.js
│
├── routes/                # Route handlers for API endpoints
│   ├── auth.js
│   └── user.js
│
├── public/                # (Optional) Static assets
│
├── .env                   # Environment-specific variables
├── .gitignore             # Git ignore rules
├── index.js               # Server entry point
├── package.json           # Project dependencies and scripts
```
## Features

- **User Registration:** Secure user signup with hashed passwords.
- **User Login:** Authentication via JWT-based token system.
- **Profile Management:** View and update user profile including name and skills.
- **Skill Management:** Add, remove, and list skills for users.
- **Authorization Middleware:** Protect routes by verifying JWT tokens.
- **Comprehensive Error Handling:** Consistent responses for client and server errors.
- **RESTful API Design:** Clean and structured API endpoints for easy integration.

5. **The backend server will run at http://localhost:5000 by default.**

## API Endpoints Overview

The backend exposes the following main API endpoints under `/api`:

- **Authentication Routes (`/api/auth`)**
  - `POST /register` : Register a new user with name, email, and password.
  - `POST /login` : Login existing users and receive a JWT token.

- **User Routes (`/api/user`)** (Protected, requires JWT token)
  - `GET /profile` : Get the logged-in user’s profile (excluding password).
  - `PUT /profile` : Update user’s name and skills.
  - `POST /skills` : Add a new skill to user’s skill list.
  - `DELETE /skills/:skillName` : Remove a skill from user’s skills.
  - `GET /skills` : Retrieve all skills of the logged-in user.
  - `GET /all` : Fetch all registered users (excluding passwords).
  - `GET /skills/stats` : Get skills statistics and users who have them.

## Environment Variables

This project uses environment variables to securely manage sensitive data and configuration. Key variables include:

- `PORT` : Specifies the port on which the server runs. Defaults to `5000` if not provided.
- `MONGO_URI` : MongoDB connection string to connect the backend to the database.
- `JWT_SECRET` : Secret key used to sign and verify JSON Web Tokens for authentication.

These variables should be stored in a `.env` file at the root of the project and must **never** be committed to version control to ensure security.

## Installation and Setup

1. **Clone the repository:**

```
git clone <repository-url>
cd SkillSync
```

2. **Install dependencies:**

```
npm install
```

3. **npm install**

```
npm install
```

4. **Start the server:**

```
npm start
```

## Error Handling Practices

- **Centralized Error Middleware:**  
  The backend uses an Express error-handling middleware to catch unhandled errors and send consistent responses with status code `500` and error details in JSON format.

- **Granular Error Responses:**  
  Specific errors such as invalid credentials, missing tokens, or resource not found return appropriate HTTP status codes like `400`, `401`, or `404` with clear messages to aid debugging and client handling.

- **Try-Catch Blocks:**  
  Async operations within controllers are wrapped in `try-catch` to manage promise rejections and runtime errors gracefully.

- **Logging:**  
  Server-side errors are logged using `console.error` to assist in monitoring and troubleshooting during development and production.

- **Security Considerations:**  
  Error messages avoid leaking sensitive information such as passwords or stack traces in client responses, maintaining security best practices.

## Security Practices

- **Password Hashing:**  
  User passwords are securely hashed using `bcryptjs` with a salt round of 10 before storing in the database, preventing plaintext password storage.

- **JWT Authentication:**  
  JSON Web Tokens (JWT) are used for stateless authentication, signed with a secret key stored securely in environment variables. Tokens have a 2-hour expiry to limit risk.

- **Protected Routes:**  
  Middleware verifies JWT on protected endpoints, ensuring only authenticated users can access sensitive data and actions.

- **Input Validation:**  
  Request payloads are validated implicitly through Mongoose schemas and additional checks in controllers to prevent malformed or malicious input.

- **Environment Variables:**  
  Sensitive information like `JWT_SECRET` and database URI are stored in `.env` files, keeping credentials out of source code.

- **CORS Configuration:**  
  `cors` middleware enables controlled cross-origin resource sharing, mitigating risks of unauthorized API access from untrusted domains.

## Future Scope

- **Role-Based Access Control (RBAC):**  
  Implement user roles (admin, user, etc.) with granular permissions for enhanced security and functionality.

- **Email Verification & Password Reset:**  
  Add email verification during registration and secure password reset functionality.

- **Advanced Input Validation:**  
  Integrate libraries like Joi or celebrate for robust request validation.

- **Logging & Monitoring:**  
  Incorporate centralized logging and monitoring tools (e.g., Winston, Sentry) for better error tracking and performance insights.

- **Rate Limiting & Throttling:**  
  Add rate limiting to prevent brute-force attacks and API abuse.

- **Testing:**  
  Develop unit and integration tests using Jest or Mocha to ensure code reliability and maintainability.

- **Dockerization & CI/CD:**  
  Containerize the application for easier deployment and automate build and deployment pipelines.

- **API Documentation:**  
  Use Swagger or Postman to generate comprehensive API documentation for easier onboarding and maintenance.

## Thank You

Grateful for your time and attention — it truly means a lot!

