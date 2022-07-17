FROM node:alpine

WORKDIR /usr/app

# Install app dependencies
COPY package*.json ./
RUN npm install -qy


# Copy app to container
COPY . .

# CMD [ "npm", "start" ]
CMD ["node", "dist/server.js"]
EXPOSE 3000