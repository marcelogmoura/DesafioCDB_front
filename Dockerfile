# Estágio 1: Build da Aplicação Angular (Builder)
FROM node:20-alpine AS builder

WORKDIR /app

COPY DesafioCDB.Web/package.json DesafioCDB.Web/package-lock.json ./

RUN npm install

COPY DesafioCDB.Web/. .

ENV PATH /app/node_modules/.bin:$PATH

RUN ng build --configuration production --output-path=dist

FROM nginx:alpine AS final

RUN rm /etc/nginx/conf.d/default.conf

COPY DesafioCDB.Web/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]