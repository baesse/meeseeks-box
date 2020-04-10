const {
  bitbucketPipelinesNode
} = require('../templates/bitbucket-pipelines/bitbucket-steps-node')
const {
  ciScriptBuild,
  ciScriptDeploy,
  ciEnvFile,
  ciSonarCheck
} = require('../templates/bitbucket-pipelines/ci-scripts.js')
const {
  dockerIgnore,
  dockerFile
} = require('../templates/bitbucket-pipelines/docker-files.js')

const command = {
  name: 'create-pipelines-node',
  run: async toolbox => {
    const {
      print,
      filesystem,
      parameters: { options }
    } = toolbox
    print.info('🚨 Aguarde estamos criando os arquivos necessários.... 🚨')
    print.info('\n')
    await filesystem.write('bitbucket-pipelines.yml', bitbucketPipelinesNode)
    await filesystem.dir(`scripts`, {
      empty: true,
      mode: '700'
    })
    await filesystem.write('scripts/build.sh', ciScriptBuild)
    await filesystem.write('scripts/deploy.sh', ciScriptDeploy)
    await filesystem.write('scripts/enviroment.sh', ciEnvFile)
    await filesystem.write('scripts/sonar.sh', ciSonarCheck)
    await filesystem.write('.dockerignore', dockerIgnore)
    await filesystem.write('dockerfile', dockerFile)
    print.info('CI STATUS: build.sh => ok 🧡')
    print.info('CI STATUS: deploy.sh => ok 🧡')
    print.info('CI STATUS: enviroment.sh => ok 🧡')
    print.info('CI STATUS: .dockerignore => ok 🧡')
    print.info('CI STATUS: dockerfile => ok 🧡')
    print.info('CI STATUS: bitbucket-pipelines.yml => ok 🧡')
    print.info('\n')
    print.info('🔴🔴🔴🔴🔴🔴 PENDENTES 🔴🔴🔴🔴🔴🔴')
    print.info('\n')
    print.info('CI STATUS: Kubernetes Ingress => pendente 💔')
    print.info('CI STATUS: Kubernetes Deployment => pendente 💔')
    print.info('CI STATUS: Kubernetes Sevice => pendente 💔')
    print.info('CI STATUS: Amazon ecr => pendente 💔')
    print.info('CI STATUS: Amazon ecr policy => pendente 💔')
    print.info('CI STATUS: Bitbucket certificado => pendente 💔')
    print.info('CI STATUS: Bitbucket variáveis => pendente 💔')
    print.info('\n')
    print.info(
      'Para os items pendentes, solicite ao time de arquitetura ou seu lider técnico a criação.'
    )
    print.info('\n')
    print.info('Leia os arquivos criados e busque entender o que fazem.')
  }
}
module.exports = command
