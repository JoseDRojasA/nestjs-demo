FROM node:14.16
RUN apt-get update
RUN apt-get -y upgrade

COPY . .

RUN yarn
RUN yarn build

CMD ["yarn", "start:prod"]