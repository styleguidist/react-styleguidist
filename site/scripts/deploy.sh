#!/usr/bin/env bash

set -e

# Deploy to Netlify

EXAMPLE_DIR="../examples/basic"
PUBLIC_DIR="build"

echo "Node $(node -v)"
echo "npm $(npm -v)"

# Build the site
echo
echo "Building the site..."
npm run sync
npm run build

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
mkdir -p "$PUBLIC_DIR/examples/basic"
cp -R $EXAMPLE_DIR/styleguide/* "$PUBLIC_DIR/examples/basic"
