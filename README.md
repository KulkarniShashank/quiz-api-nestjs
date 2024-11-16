# Quiz API Service

This project provides a backend service to manage and execute quizzes using NestJS, Prisma ORM, and PostgreSQL. The APIs are designed to handle quiz creation, answer submissions, and result retrieval while following RESTful principles and best practices.

---

## Features

- **Create Quiz**: Add a new quiz with multiple questions and answer options.
- **Fetch Quiz**: Retrieve a quiz by its ID without revealing the correct answers.
- **Submit Answer**: Submit answers to a specific question and get immediate feedback.
- **Retrieve Results**: Get the user’s score and a detailed summary of correct/incorrect answers.
- **Test Coverage**: Includes unit and integration tests for API reliability.
- **Built with Modern Tech Stack**: Uses NestJS, Prisma ORM, TypeScript, and PostgreSQL.

---

## Prerequisites

Before starting, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)
- PostgreSQL (local installation or Docker container)

---

## Setup and Installation

### Step 1: Clone the Repository
Clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/quiz-api-service.git
cd quiz-api-service
```

### Step 2: Install Dependencies
Install the necessary Node.js dependencies:

```bash
npm install
```

### Step 3: Set Up the Database
Option 1: Use Docker for PostgreSQL
Start a PostgreSQL container using Docker:

```bash
docker run --name quiz-postgres \
  -e POSTGRES_USER=youruser \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=quizdb \
  -p 5432:5432 \
  -d postgres
```
Option 2: Use an Existing PostgreSQL Database
If you have PostgreSQL installed locally or on a server, create a database manually.

### Step 4: Configure Environment Variables
Create a `.env` file by copying the example file:

```bash
cp .env.example .env
```

Update the .env file with your database connection details:

```bash
DATABASE_URL="postgresql://youruser:yourpassword@localhost:5432/quizdb?schema=public"
PORT=3000
```

### Step 5: Set Up Prisma

```bash
npx prisma migrate dev --name init
```

(Optional) Seed the database with initial data:

```bash
npx prisma db seed
```

### Step 6: Run the Application
Start the application in development mode:

```bash
npm run start:dev
```

The application will run at http://localhost:3000.

### Step 7: Run with Docker Compose (Optional)
To start both the application and database using Docker Compose:

1. Ensure your docker-compose.yml is correctly set up.
2. Run the following command:

```bash
docker-compose up --build
```

### Step 8: Verify the Application

Once the application is running, you can use tools like [Postman](https://www.postman.com/), [cURL](https://curl.se/), or any HTTP client to test the APIs.

#### Base URL
- If running locally: `http://localhost:3000`
- If using Docker Compose: `http://localhost:<exposed-port>`

---

#### API Endpoints

Here’s a list of available API endpoints and their functionalities:

| **Endpoint**                                 | **Method** | **Description**                                      |
|----------------------------------------------|------------|------------------------------------------------------|
| `/quiz`                                      | `POST`     | Create a new quiz.                                   |
| `/quiz/:quizId`                              | `GET`      | Fetch a quiz by ID (questions without correct answers). |
| `/quiz/:quizId/question/:questionId/answer`  | `POST`     | Submit an answer for a specific question and get feedback. |
| `/quiz/:quizId/results`                      | `GET`      | Retrieve results for a quiz, including score and detailed summary. |

---

Testing the APIs
Use tools like Postman or curl to test the APIs. The base URL is http://localhost:3000.

### Step 9: Run Tests
Run the following commands to execute tests:

- Unit Tests:
```bash
npm run test
```

- End-to-End Tests:
```bash
npm run test:e2e
```

- Test Coverage:
```bash
npm run test:cov
```

### Project Structure

The following is the structure of the project, organized to ensure readability, scalability, and maintainability:

```plaintext
src/
├── quiz/                  # Module handling quiz-related functionality
│   ├── dto/               # Data Transfer Objects (DTOs) for validation
│   │   ├── create-quiz.dto.ts      # DTO for creating a quiz
│   │   ├── submit-answer.dto.ts    # DTO for submitting an answer
│   ├── quiz.controller.ts  # Controller for handling HTTP requests
│   ├── quiz.service.ts     # Business logic and service methods
│   ├── quiz.module.ts      # Module configuration for the quiz feature
├── prisma/                # Prisma-related configurations
│   ├── prisma.service.ts   # Service to interact with the Prisma Client
│   ├── schema.prisma       # Prisma schema for database models
├── app.module.ts          # Root module that imports all other modules
├── main.ts                # Entry point of the application
├── common/                # Shared utilities and middleware
│   ├── interceptors/       # Custom request/response interceptors
│   ├── exceptions/         # Custom exceptions and error handling
│   ├── decorators/         # Custom decorators (if any)
├── tests/                 # Test files for unit and e2e testing
│   ├── quiz.controller.spec.ts  # Unit tests for the quiz controller
│   ├── quiz.service.spec.ts     # Unit tests for the quiz service
│   ├── e2e/                # End-to-end (e2e) test cases
├── assets/                # Static files like images or other resources
├── config/                # Configuration files (e.g., environment)
│   ├── app.config.ts       # Application-level configurations
│   ├── database.config.ts  # Database connection configurations
docker-compose.yml         # Docker Compose file for service orchestration
.env                       # Environment variable configuration file
package.json               # Dependencies and scripts for the project
README.md                  # Project documentation (this file)
```

### Command Summary

Below is a quick reference for all essential commands used in this project:

---

#### Installation and Setup

| Command                       | Description                                                    |
|-------------------------------|----------------------------------------------------------------|
| `npm install`                 | Installs all project dependencies.                            |
| `npm run start`               | Starts the application in production mode.                    |
| `npm run start:dev`           | Starts the application in development mode with hot reloading.|
| `npm run build`               | Builds the application for production.                        |

---

#### Running the Application

| Command                       | Description                                                    |
|-------------------------------|----------------------------------------------------------------|
| `npm run start`               | Starts the application in production mode.                    |
| `npm run start:dev`           | Starts the application in development mode with hot reloading.|
| `npm run start:debug`         | Starts the application in debug mode.                         |

---

#### Running Tests

| Command                       | Description                                                    |
|-------------------------------|----------------------------------------------------------------|
| `npm run test`                | Runs unit tests.                                               |
| `npm run test:e2e`            | Runs end-to-end tests.                                         |
| `npm run test:cov`            | Generates a code coverage report.                              |

---

#### Prisma ORM Commands

| Command                       | Description                                                    |
|-------------------------------|----------------------------------------------------------------|
| `npx prisma migrate dev`      | Applies database migrations in development.                    |
| `npx prisma migrate deploy`   | Applies database migrations in production.                     |
| `npx prisma db push`          | Pushes schema changes to the database without creating migrations. |
| `npx prisma generate`         | Regenerates Prisma Client based on the schema.                 |

---

#### Docker Commands

| Command                       | Description                                                    |
|-------------------------------|----------------------------------------------------------------|
| `docker-compose up`           | Starts the application and its dependencies (e.g., PostgreSQL).|
| `docker-compose down`         | Stops and removes containers defined in `docker-compose.yml`. |

---

#### Additional Commands

| Command                       | Description                                                    |
|-------------------------------|----------------------------------------------------------------|
| `npm run lint`                | Runs linting to ensure code quality and standards.             |
| `npm run format`              | Formats the code using Prettier.                               |

---

### Usage Tips

- **Start in Development Mode:** Use `npm run start:dev` to start the app with hot-reloading for rapid development.
- **Run Tests Regularly:** Use `npm run test` and `npm run test:e2e` during development to ensure functionality.
- **Database Migrations:** Use `npx prisma migrate dev` to create and apply migrations during schema changes.
- **Docker Deployment:** Use `docker-compose up` for a fully containerized setup of the application.

---

This command summary provides a quick reference for common development, testing, and deployment tasks.
