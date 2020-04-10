const bitbucketPipelinesNode = `
image: node:10

pipelines:
  branches:
    develop:
      - step:
          name: Install dependencies
          caches:
            - node
          script:
            - npm install
      - step:
          name: Execute test
          caches:
            - node
          script:
            - npm install
            - bash scripts/environment.sh
            - npm run test
          services: 
            - postgres
      - step:
          name: Validate sonar metrics
          caches:
            - node
          script:
            - npm run test
            - bash scripts/sonar.sh
      - step:
          name: Build Docker Image
          image: atlassian/pipelines-awscli
          script:
            - bash scripts/build.sh
      - step:
          name: Pushing image to Kubernetes (Dev Environment)
          image: atlassian/pipelines-kubectl
          script:
            - bash scripts/deploy.sh
options:
  docker: true
definitions: 
  services: 
    postgres: 
      image: postgres 
      variables: 
        POSTGRES_DB: 'pipelines' 
        POSTGRES_USER: 'test_user'
        POSTGRES_PASSWORD: 'password'
`
module.exports.bitbucketPipelinesNode = bitbucketPipelinesNode
