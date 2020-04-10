const ciScriptBuild = `
#!/bin/bash
aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
echo $(aws ecr get-login --no-include-email --region \${AWS_REGION}\)  > login.sh
sh login.sh
docker build -t $DOCKER_IMAGE_NAME:\${BITBUCKET_COMMIT}\ .
docker tag $DOCKER_IMAGE_NAME:\${BITBUCKET_COMMIT}\ $DOCKER_ECR_REPO_URL/$DOCKER_IMAGE_NAME:\${BITBUCKET_COMMIT}\
docker push $DOCKER_ECR_REPO_URL/$DOCKER_IMAGE_NAME:\${BITBUCKET_COMMIT}\
`
module.exports.ciScriptBuild = ciScriptBuild

const ciScriptDeploy = `
#!/bin/bash
kubectl config set-cluster kubernetes --certificate-authority=ca.crt --server=$K8s_SERVER_URL
kubectl config set-credentials $K8s_USERNAME --token=$K8s_USER_TOKEN
kubectl config set-context aws --cluster=kubernetes --namespace=$K8s_NAMESPACE --user=$K8s_USERNAME
kubectl config use-context aws --user=$K8s_USERNAME
kubectl set image deployment/$DOCKER_IMAGE_NAME $DOCKER_IMAGE_NAME=$DOCKER_ECR_REPO_URL/$DOCKER_IMAGE_NAME:\${BITBUCKET_COMMIT}\ --user=$K8s_USERNAME --local=false
`
module.exports.ciScriptDeploy = ciScriptDeploy

const ciEnvFile = `
#!/bin/bash
echo "BASE_URL=http://localhost:3000
VERSION=v1
PORT=3000

#Auth

SECRET=$SECRET

#corsOptions 

ORIGIN=*
METHODS=GET,POST,PUT,PATCH,DELETE,OPTIONS
PREFLIGHT_CONTINUE=false
OPTIONS_SUCCESS_STATUS=204

#Mail

MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASS=

#Upload

SECRET_ACCESS_KEY=$SECRET_ACCESS_KEY
ACCESS_KEY_ID=$ACCESS_KEY_ID
BUCKET=$BUCKET
REGION=$REGION

#DatabaseDEV

DB_HOST=$DB_HOST
DB_USER=$DB_USER
DB_PASS=$DB_PASS
DB_NAME=

#DatabaseTEST

DB_HOST_TEST=postgres
DB_USER_TEST=test_user
DB_PASS_TEST=33583299f1da6815b09ac694fe446c37
DB_NAME_TEST=pipelines

" > .env

`
module.exports.ciEnvFile = ciEnvFile

const ciSonarCheck = `
#!/bin/bash
npm install -g sonarqube-scanner
sonar-scanner -Dsonar.host.url=$SONAR_ADDRESS  -Dsonar.projectKey=$DOCKER_IMAGE_NAME -Dsonar.sources=api/ -Dsonar.exclusions=api/helpers/*.js,api/models/*.js,node_modules,yarn.lock,package-lock.json,coverage/*,swagger.json -Dsonar.host.url=$SONAR_ADDRESS -Dsonar.login=$SONAR_TOKEN_PROJECT -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info 
curl -H "Accept: application/json"  -u $SONNAR_KEY: SONAR_ADDRESS_API\?projectKey\=$DOCKER_IMAGE_NAME -o data.json 
status=$(cat ./data.json| sed -n 's|.*"status":"\\([^"]*\\)".*|\\1|p')
if [ "$status" = "ERROR" ];
then 
    exit(1)
fi
`
module.exports.ciSonarCheck = ciSonarCheck
