FROM node:18 as build

WORKDIR /app

COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install

COPY . .

RUN ng build

FROM nginx:alpine
COPY --from=build /app/dist/[paper-registration] /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
