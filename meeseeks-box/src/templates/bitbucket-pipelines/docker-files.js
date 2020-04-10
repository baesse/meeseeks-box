const dockerIgnore = `
node_modules
`
module.exports.dockerIgnore = dockerIgnore

const dockerFile = `
FROM node:alpine
WORKDIR /project 
COPY . .
EXPOSE 1337
RUN npm install
CMD [ "npm", "run", "start:staging" ]
`
module.exports.dockerFile = dockerFile
