# The Legend of Tilde
## (server app)

This is the server repo for my final project at Galvanize. It is completely decoupled from the [front-end app](https://www.github.com/skuttleman/capstone-front-end), and uses JWT to maintain authorization through Google OAuth.

This is a 2 player cooperative puzzle game. Players must communicate what they see and what they need from the other player through rudimentary symbols in order to solve the puzzles. It uses socket.io for game update notification when the player is online, or the Twilio API for SMS notification when the player is offline.

View the deployed app at [legendoftilde.com](https://legendoftilde.com)
