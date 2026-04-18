#Development
FROM node:22-alpine

#Work directory
WORKDIR /app

#Copy files
COPY package*.json ./

#Install dependencies
RUN npm install

#Copy all files
COPY . ./

#Expose port
EXPOSE 5000

#Start the server
CMD ["npm","run", "dev"]