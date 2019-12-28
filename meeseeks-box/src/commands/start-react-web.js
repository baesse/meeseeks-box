const { renderReactIndex } = require('../templates/react-web/react-web-index')
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
    spinner.succeed()
    print.info(`I'm Mr. Meessek Look at your app...`)
  }
}

module.exports = command
