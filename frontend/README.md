# Frontend Application

This repository contains the ReactJS frontend for the application. The app supports local development, Dockerized deployment, and includes test cases.


## Installation and Running Locally

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Access the app at [http://localhost:3000](http://localhost:3000).

---

## Running with Docker

### Build and Start the Container

1. Build the Docker image:

   ```bash
   docker-compose build
   ```

2. Start the container:

   ```bash
   docker-compose up
   ```

3. Access the app at [http://localhost:3000](http://localhost:3000).

---

## Running Tests

### Locally

To execute tests locally:

1. Run the test cases:

   ```bash
   npm test
   ```

2. For non-interactive mode:

   ```bash
   npm test -- --watchAll=false
   ```

### Inside Docker

1. Access the running container:

   ```bash
   docker exec -it <container-id> sh
   ```

2. Execute the tests:

   ```bash
   npm test
   ```

3. For non-interactive mode:

   ```bash
   npm test -- --watchAll=false
   ```

4. Alternatively, create a `tests` service in `docker-compose.yml` for automated testing (see `docker-compose.yml` for more details).

---

## Environment Variables

The app supports environment variables for configuring API endpoints and other settings. Create a `.env` file in the root directory with the following:

```env
REACT_APP_API_BASE_URL=http://localhost:8000
```

Update the values based on your environment.

---

## Folder Structure

```
frontend/
├── __mocks__/          # Test Mocks
├── __tests__/          # Test cases
├── public/             # Static assets
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── App.js          # Main app component
│   └── index.js        # Entry point
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose setup
└── package.json        # Project dependencies
```

---
