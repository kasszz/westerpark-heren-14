const chalk = require('chalk')
const fse = require('fs-extra')
const path = require('path')
const nunjucks = require('nunjucks')
const dataLoader = require('../lib/data-loader')
const dateFormatter = require('../lib/date-formatter')
const nameFormatter = require('../lib/name-formatter')

const rootDir = path.join(__dirname, '..')
const inputDir = 'src'
const outputDir = path.join(__dirname, '..', 'dist')
const playersSlug = 'players/'
const matchesSlug = 'matches/'

const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(inputDir))

env.addFilter('fullName', nameFormatter.fullName)
env.addFilter('firstName', nameFormatter.firstName)
env.addFilter('surname', nameFormatter.surname)
env.addFilter('initials', nameFormatter.initials)
env.addFilter('dateFormatter', dateFormatter)

dataLoader.load().then(renderAll)

function renderAll (data) {
  return Promise.all([
    renderHome(data),
    renderPlayerList(data),
    renderPlayers(data),
    renderMatchesOverview(data),
    renderMatches(data)
  ])
  .then(() => console.log(chalk.green(`✓ HTML pages saved to ${path.relative(rootDir, outputDir)}/`)))
  .catch(err => console.log(chalk.red(`✘ HTML render error\n`, err)))
}

function renderHome (data) {
  return renderViewToFile('home', data)
}

function renderPlayerList (data) {
  return renderViewToFile('player-list', data, playersSlug)
}

function renderPlayers (data) {
  return Promise.all(data.players.map(player => {
    return renderViewToFile('player', player, `${playersSlug}${player.slug}`)
  }))
}

function renderMatchesOverview (data) {
  return renderViewToFile('matches-overview', data, matchesSlug)
}

function renderMatches (data) {
  return Promise.all(data.matches.map(match => {
    return renderViewToFile('match', match, formatMatchSlug(match))
  }))
}

function formatMatchSlug (match) {
  const opponentSlug = match.opponent.replace(' ', '-').toLowerCase()
  match.date = dateFormatter(match.date)
  return `${matchesSlug}${match.date}/${opponentSlug}/`
}

function renderViewToFile(view, data, slug) {
  const baseUrl = slug ? `${path.relative(slug, './')}/` : './'
  const dirName = slug ? slug + '/' : ''
  const urlLevels = slug ? slug.split('/') : []
  Object.assign(data, { baseUrl, urlLevels })

  return renderView(view, data)
    .then(html => fse.outputFile(`${outputDir}/${dirName}index.html`, html))
}

function renderView (view, data) {
  return new Promise((resolve, reject) => env.render(`views/${view}.html`, data, (err, html) => {
    err ? reject(err) : resolve(html)
  }))
}
