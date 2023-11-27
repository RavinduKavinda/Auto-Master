
# Auth0 Integration in Node MVC Application

This repository contains a simple Node.js MVC application that demonstrates the integration of Auth0 for authentication. Follow the steps below to set up and run the application.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/RavinduKavinda/Auto-Master.git
    ```

2. Navigate to the project directory:

    ```bash
    cd auth0-implementation
    ```

3. Install the dependencies using npm:

    ```bash
    npm install
    ```

## Project Configuration


Set the following environment variables in your local environment or create a `.env` file in the project root:

```plaintext
        PORT = port
        DB_URL=MySQL DB URL
        AUTH0_ISSUER_BASE_URL=Issuer Base URL
        AUTH0_CLIENT_ID=Auth0 client ID
        BASE_URL=Application BaseURL with above port
        SESSION_SECRET=Secret value for auth0 sessions (some random value)
        AUTH0_MGMT=Auth0 Management API key
        SERVER_RESTART_TIMEOUT=Server restart timeout on a server failure
        NODE_ENV=production
```

Replace `your-auth0-domain`, `your-client-id`, and `your-client-secret` with the appropriate values from your Auth0 application.

## Usage

Start the application using the following command:

```bash
npm start
```

The application will be accessible at [http://localhost:8080](http://localhost:8080). Visit this URL in your web browser to see the Auth0 integration in action.


