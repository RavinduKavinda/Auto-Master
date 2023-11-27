FROM node:16 as build

WORKDIR /usr/app
COPY . .
RUN npm install

FROM node:alpine as main

COPY --from=build /usr/app /
COPY . .
EXPOSE 8080
CMD ["node", "app.js"]