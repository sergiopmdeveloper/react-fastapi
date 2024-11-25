#!/bin/bash

docker build -t react-fastapi-template-backend-service .
docker run --env-file .env --rm --name react-fastapi-template-backend-service -p 80:80 react-fastapi-template-backend-service
