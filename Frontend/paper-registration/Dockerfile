# Use official Node.js image to build the Angular app
FROM node:18 AS build


ARG GITHUB_TOKEN
RUN git clone https://${GITHUB_TOKEN}@github.com/coSK123/paper-registration.git /app

# Setze das Arbeitsverzeichnis
WORKDIR /app/Frontend/paper-registration

# Installiere die Abhängigkeiten
RUN npm install

# Baue die Angular-App für die Produktion
RUN npm run build --prod

# Verwende Nginx, um die gebaute Angular-App zu servieren
FROM nginx:alpine
COPY --from=build /app/Frontend/paper-registration/dist/paper-registration /usr/share/nginx/html
EXPOSE 80
