FROM node:4-onbuild
ADD . /code
WORKDIR /code
RUN npm build

CMD ["npm", "start"]
