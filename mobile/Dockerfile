FROM node:18-alpine
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose ports for Expo
EXPOSE 8081 19000 19001 19002

# Start Expo development server
CMD ["npx", "expo", "start", "--tunnel"]