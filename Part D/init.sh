#!/bin/bash

cd "$(dirname "$0")"

set -e

echo "Installing server dependencies..."
cd server
npm install

echo "Installing client dependencies..."
cd ../client
npm install

echo "Starting the project..."
cd ..
./start.sh