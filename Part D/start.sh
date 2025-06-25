#!/bin/bash

cd "$(dirname "$0")"

# Start server
cd server
node index.js &
SERVER_PID=$!

# Start client
cd ../client
npm start &
CLIENT_PID=$!

# Trap Ctrl+C and kill both
trap "echo 'Stopping...'; kill $SERVER_PID $CLIENT_PID" SIGINT

# Wait for both to finish
wait