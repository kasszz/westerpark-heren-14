const chalk = require('chalk')
const fse = require('fs-extra')
const path = require('path')
const nunjucks = require('nunjucks')
const dataLoader = require('../lib/data-loader')
const dateFormatter = require('../lib/date-formatter')
const nameFormatter = require('../lib/name-formatter')
const slugFormatter = require('../lib/slug-formatter')
const goalSplitter = require('../lib/goal-splitter')

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
env.addFilter('slugFormatter', slugFormatter)

env.addGlobal('goalSplitter', goalSplitter)

dataLoader.load().then(renderAll)

function renderAll (data) {
  return Promise.all([
    renderHome(data),
    renderPlayerList(data),
    renderPlayers(data),
    renderMatchesOverview(data),
    renderMatches(data),
    renderAddMatch(data)
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
    Object.assign(data, { player })
    return renderViewToFile('player', data, `${playersSlug}${player.slug}`)
  }))
}

function renderMatchesOverview (data) {
  return renderViewToFile('matches-overview', data, matchesSlug)
}

function renderMatches (data) {
  return Promise.all(data.matches.map(match => {
    return renderViewToFile('match', {match}, matchSlugFormatter(match))
  }))
}

function renderAddMatch (data) {
  return renderViewToFile('add-match', data, 'matches', 'add')
}

function matchSlugFormatter (match) {
  return path.join('matches', dateFormatter(match.date), slugFormatter(match.opponent))
}

function renderViewToFile(view, data, slug, name) {
  const baseUrl = slug ? `${path.relative(slug, './')}/` : './'
  const dirName = slug ? slug + '/' : ''
  const urlLevels = slug ? slug.split('/') : []
  const filename = name ? name : 'index'

  Object.assign(data, { baseUrl, urlLevels })

  return renderView(view, data)
    .then(html => fse.outputFile(`${outputDir}/${dirName}${filename}.html`, html))
}

function renderView (view, data) {
  return new Promise((resolve, reject) => env.render(`views/${view}.html`, data, (err, html) => {
    err ? reject(err) : resolve(html)
  }))
}
