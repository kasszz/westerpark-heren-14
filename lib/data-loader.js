const fse = require('fs-extra')
const path = require('path')

const models = ['players', 'matches']

function load () {
  return Promise.all(models.map(model => {
    return fse.readJson(path.join(__dirname, '../', 'data', `${model}.json`))
      .then(data => ({ model, data }))
  }))
  .then(collections => collections.reduce((out, collection) => Object.assign(out, {
    [collection.model]: collection.data
  }), {}))
}

module.exports = { load }
