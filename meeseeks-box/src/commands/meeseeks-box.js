const command = {
  name: 'meeseeks-box',
  run: async toolbox => {
    const { print } = toolbox

    print.info('Welcome to meesseks box cli')
  }
}

module.exports = command
