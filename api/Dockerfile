#  Dockerfile for Node Hapi Backend

FROM node:16-alpine3.14

WORKDIR /app

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

# Exports
EXPOSE 3001

CMD ["npm","start"]