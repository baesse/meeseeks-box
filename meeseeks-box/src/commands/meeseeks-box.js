const help = require('../templates/help')

const command = {
  name: 'meeseeks-box',
  run: async toolbox => {
    const { print } = toolbox

    print.info(help.help)
  }
}
module.exports = command
