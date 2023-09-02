FROM node:14-alpine
WORKDIR /kronosdb
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD npm run dev
