#!/bin/bash

# Retrieve branch name
branch=$(git branch --show-current)

if [ "$branch" == "deploy" ]; then
  # Proceed with build
    exit 1;
else
  # Don't build
  exit 0;
fi