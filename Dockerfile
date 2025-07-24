FROM node:22.15.1-alpine3.20

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .

RUN npm run db:generate
RUN npm run build

#cp -r ./src/generated ./dist
RUN cp -rf ./src/generated ./dist

# Entrypoint => Processo principal => node | curl
# CMD => Parâmetros para o entrypoint => dist
ENTRYPOINT [ "node" ]

CMD [ "/app/dist" ]