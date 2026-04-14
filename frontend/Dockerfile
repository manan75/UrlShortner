# ---------- Build Stage ----------
FROM node:22 as build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the app (Vite → dist folder)
RUN npm run build


# ---------- Production Stage ----------
FROM nginx:1.29-alpine

# Copy built files to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]