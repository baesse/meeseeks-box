const { renderReactIndex } = require('../templates/react-web/react-web-index')
const { sagaTemplateIndex } = require('../templates/react-web/sagas-index')
const { ducksTemplateIndexDefault } = require('../templates/react-web/duck-index')
const { isAuthenticated } = require('../templates/react-web/isAuthenticated')
const { storeTemplateIndex } = require('../templates/react-web/store-index')
const { routesTemplateIndex } = require('../templates/react-web/routes-index')
const { urlsTemplateIndex } = require('../templates/react-web/urls-index')

const ora = require('ora')
const filesToRemove = [
  'App.css',
  'App.js',
  'App.test.js',
  'index.css',
  'logo.svg',
  'serviceWorker.js',
  'setupTests.js',
  'index.js'
]
const command = {
  name: 'cra-web',
  run: async toolbox => {
    const {
      print,
      system,
      filesystem,
      parameters: { options }
    } = toolbox
     print.info('🚨 Waiting...! React application is building.... 🚨')
     await filesystem.remove(options.name)
     const spinner = ora('Loading meeseeks...').start()
     const spinnerFiles = ora()
     await system.run(`npx create-react-app ${options.name}`)
     filesToRemove.forEach(async element => {
       spinnerFiles.warn(`Removing unecessary file ${element}`)
       await filesystem.remove(`${options.name}/src/${element}`)
     })
     await filesystem.write(`${options.name}/src/index.jsx`, renderReactIndex)
     await filesystem.dir(`${options.name}/src/store`, { empty: true, mode: '700' })
     await filesystem.dir(`${options.name}/src/store/ducks`, { empty: true, mode: '700' })
     await filesystem.dir(`${options.name}/src/sagas`, { empty: true, mode: '700' })
     await filesystem.dir(`${options.name}/src/helpers`, { empty: true, mode: '700' })
     await filesystem.dir(`${options.name}/src/utils`, { empty: true, mode: '700' })
     await filesystem.dir(`${options.name}/src/containers`, { empty: true, mode: '700' })
     await filesystem.dir(`${options.name}/src/components`, { empty: true, mode: '700' })
     await filesystem.dir(`${options.name}/src/components/core`, { empty: true, mode: '700' })
     await filesystem.dir(`${options.name}/src/components/presentation`, { empty: true, mode: '700' })
     await filesystem.write(`${options.name}/src/store/sagas/index.js`, sagaTemplateIndex)
     await filesystem.write(`${options.name}/src/store/ducks/index.js`, ducksTemplateIndexDefault)
     await filesystem.write(`${options.name}/src/store/store.js`, storeTemplateIndex)
     await filesystem.write(`${options.name}/src/utils/routes.js`, routesTemplateIndex)
     await filesystem.write(`${options.name}/src/utils/constants/urls.js`, urlsTemplateIndex)
     await filesystem.dir(`${options.name}/src/utils/API`, { empty: true, mode: '700' })
     await filesystem.dir(`${options.name}/src/utils/constants`, { empty: true, mode: '700' })
     await filesystem.write(`${options.name}/src/utils/isAuthentications.js`, isAuthenticated)
     print.info('🚨 Calling more Meessek 🚨')
     await system.run(`cd ${options.name} && npm i -s axios history moment redux redux-saga reduxsauce styled-components connected-react-router`)
     spinner.succeed()
     print.info(`I'm Mr. Meessek Look at your app...`)
  }
}

module.exports = command
