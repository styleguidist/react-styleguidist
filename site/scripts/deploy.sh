#!/usr/bin/env bash

set -e

# Deploy to Netlify

EXAMPLE_DIR="../examples/basic"
STATIC_DIR="static"

echo "Node $(node -v)"
echo "npm $(npm -v)"

# Build a basic example
echo
echo "Building the basic example..."
cd "$EXAMPLE_DIR"
npm install
npm run styleguide:build
cd -

# Copy to the public folder
echo
echo "Copying the basic example..."
mkdir -p "$STATIC_DIR/examples/basic"
cp -R $EXAMPLE_DIR/styleguide/* "$STATIC_DIR/examples/basic"

# Build the site
echo
echo "Building the site..."
npm run sync
npm run build
