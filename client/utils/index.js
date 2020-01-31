const files = require.context('.', false, /\.js$/)
const utils = {}

files.keys().forEach(fileName => {
  if (fileName === './index.js') return
  utils[fileName.replace(/(\.\/|\.js)/g, '')] = files(fileName).default
})

export default utils
