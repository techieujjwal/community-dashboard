#!/bin/bash
API_KEY="AIzaSyCKjLAfhnIeo5b8FROjftcA27Bc-UIoGgw"
EMAIL="anushree1606balaji@gmail.com"
PASSWORD='Pati$$786'

curl -s -X POST "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=$API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\",\"returnSecureToken\":true}" \
  | jq -r '.idToken'
