#!/bin/bash

if [ ! -f "./.env.local" ]; then
  echo "Secrets not found. Pulling files from Bitwarden..."
  if [[ -z "${BW_PASSWORD}" ]]; then
    echo "Error: BW_PASSWORD envvar is not defined. Please inject BW_PASSWORD into container!"
    exit 1;
  fi

  # get secrets
  npx bw logout
  export BW_SESSION=$(npx bw login product@bitsofgood.org ${BW_PASSWORD} --raw);
  npx bw sync -- --session $BW_SESSION
  npx bw get item 4636e394-2e6e-416d-a11e-b08f01589867 | npx fx .notes > ".env.local"

  echo "Secrets successfully retrieved."
fi

yarn dev
