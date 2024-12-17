### Steps

1. Clone this repository

```bash
   git clone https://github.com/suryo811/assignment_chat_app
```

2. Install the required dependencies using `npm install`

3. Create a `.env` file based on `.env.example`

4. Run the project using `npm start`

### API end-points (HTTP)

- Register a user `POST` `/api/v1/auth/register`
- User login `POST` `/api/v1/auth/login`
- Fetch messages of a chat-room `GET` `/api/v1/message`

### Websocket Requests

- Connect a client `ws://localhost:3000?token`
- Token param is required (Only logged in user allowed)
- Three events : `send-message`, `new-message`, `rate-limit`
