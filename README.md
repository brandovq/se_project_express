# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Technologies and Techniques

- Node.js and Express build the API and handle routes.
- MongoDB and Mongoose store users and clothing items.
- Mongoose schemas validate data; controllers handle errors and return HTTP status codes.
- ESLint with the Airbnb style guide and Prettier format the code.
- Nodemon restarts the server during development.

## Running the Project

`npm run start` — launch the server

`npm run dev` — launch the server with automatic restarts during development

## API

The server runs at `http://localhost:3001` by default. CORS is enabled for cross-origin client requests.

### Authentication

Create an account with `POST /signup`, sending `name`, `avatar`, `email`, and `password` in the JSON body. Sign in with `POST /signin`, sending `email` and `password`; the response contains a JWT valid for seven days.

#### Trying authentication in Postman

1. Start the server with `npm run dev` or `npm run start`.
2. In Postman, create a request using the `POST` method and the URL `http://localhost:3001/signup`.
3. Select **Body → raw → JSON** and enter the following example. Use a valid email and an avatar URL for your account:

   ```json
   {
     "name": "Alex",
     "avatar": "https://example.com/avatar.png",
     "email": "alex@example.com",
     "password": "your-password"
   }
   ```

4. Select **Send**. If signup succeeds, make a second request using `POST` and the URL `http://localhost:3001/signin`. Under **Body → raw → JSON**, enter the same email and password, then select **Send**.
5. Copy the `token` value from the sign-in response. For a protected request, such as `GET http://localhost:3001/users/me`, open the request's **Authorization** tab, choose **Bearer Token** as the type, and paste the copied token into the **Token** field. Postman adds the authorization header automatically.

Passwords are hashed before storage and are not included in user responses.

### Endpoints

| Method | Path | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/signup` | Public | Create an account |
| `POST` | `/signin` | Public | Sign in and receive a JWT |
| `GET` | `/users/me` | Authenticated | Get the current user |
| `PATCH` | `/users/me` | Authenticated | Update the current user's name and avatar |
| `GET` | `/items` | Public | List clothing items |
| `POST` | `/items` | Authenticated | Create a clothing item |
| `DELETE` | `/items/:itemId` | Authenticated; owner only | Delete an item you created |
| `PUT` | `/items/:itemId/likes` | Authenticated | Like an item |
| `DELETE` | `/items/:itemId/likes` | Authenticated | Remove your like from an item |

Deleting an item owned by someone else returns `403 Forbidden`.

### Testing

Before committing your code, make sure `sprint.txt` in the root folder contains the number of the sprint you're currently working on (for example, `12`).
