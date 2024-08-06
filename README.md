# Email Auto Tool

This project demonstrates how to build a Node.js application using Express to automate email responses. It utilizes Google OAuth2 for authentication and integrates with the Gmail API to fetch and categorize emails. Additionally, it uses OpenAI's GPT-3.5 Turbo model to suggest responses based on email content.

## Features

- Google OAuth2 authentication for accessing Gmail.
- Fetches recent emails from a Gmail account.
- Categorizes emails into categories like "Interested," "Not Interested," or "More Information."
- Uses OpenAI to suggest responses to email content.
- Sends automated replies based on email categories.
- Periodically checks for new emails and processes them.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/email-automation.git
   ```

2. Navigate to the project directory:

   ```bash
   cd email-automation
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory with the following environment variables:

   ```plaintext
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   API=your_openai_api_key
   ```

## Usage

1. Start the server:

   ```bash
   npm start
   ```

2. Access the application at `http://localhost:3000`.

3. Authenticate with Google to access your Gmail account.

4. The application will fetch recent emails, categorize them, and suggest responses.

## Endpoints

- `GET /auth/google` - Initiates Google OAuth2 authentication.
- `GET /auth/google/callback` - Handles the callback from Google OAuth2 and redirects to `/profile`.
- `GET /profile` - Displays the profile and recent emails.
- `GET /email/:id` - Fetches details of a specific email by ID.
- `POST /suggest-response` - Suggests a response to a given email content.
- `GET /api/emails` - Fetches and categorizes recent emails.
- `POST /not` - Dummy endpoint for testing purposes (if applicable).

## Technologies Used

- [Express](https://expressjs.com/) - Web framework for Node.js.
- [Passport](http://www.passportjs.org/) - Authentication middleware for Node.js.
- [passport-google-oauth20](https://github.com/jaredhanson/passport-google-oauth2) - Google OAuth2 strategy for Passport.
- [Google APIs Node.js Client](https://github.com/googleapis/google-api-nodejs-client) - Google APIs client library.
- [axios](https://axios-http.com/) - Promise-based HTTP client.
- [base64url](https://www.npmjs.com/package/base64url) - Base64 URL encoding and decoding.
- [dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from a `.env` file.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [OpenAI](https://openai.com/) - For providing the GPT-3.5 Turbo model.
- [Google](https://developers.google.com/gmail/api) - For the Gmail API.
