# Backend Dockerfile
# Verwende die LTS-Version von Node.js
FROM node:18

# Arbeitsverzeichnis für das Klonen des Repositories
WORKDIR /app

# Übergibt das GitHub-Token als Build-Argument
ARG GITHUB_TOKEN
RUN git clone https://${GITHUB_TOKEN}@github.com/coSK123/paper-registration.git .

# Arbeitsverzeichnis für das Backend
WORKDIR /app/Backend

# Installiere Backend-Abhängigkeiten
RUN npm install

# Expose den Port, auf dem die Express-App läuft
EXPOSE 3000

# Starte den Server
CMD ["node", "app.js"]


