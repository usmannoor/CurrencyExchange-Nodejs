FROM node:10.15.3

# Create app directory
WORKDIR /app/dir

# COPY package*.json /app

# Bundle app source
RUN apt-get update && apt-get -y install vim
COPY . /app/dir
RUN npm install

CMD ["npm", "start"]
EXPOSE 80
