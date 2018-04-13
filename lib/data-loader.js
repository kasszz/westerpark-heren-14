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
  .then(collection => {
    const { matches, players } = collection

    matches.forEach(match => {
      players.forEach(player => {
        setParticipation(match, player)
        setGoals(match, player)
        setAssists(match, player)
      })
    })

    return { matches, players }
  })
}

function setParticipation (match, player) {
  if (!player.participationMatches) {
    player.participationMatches = 0
  }

  match.players.forEach(matchPlayer => {
    if (matchPlayer.slug && matchPlayer.slug === player.slug) {
      player.participationMatches += 1
    }
  })
}

function setGoals (match, player) {
  if (!player.goals) {
    player.goals = 0
  }

  match.goals.forEach(goal => {
    if (goal.player && goal.player.slug === player.slug) {
      player.goals += 1
    }
  })
}

function setAssists (match, player) {
  if (!player.assists) {
    player.assists = 0
  }

  match.goals.forEach(goal => {
    if (goal.player && goal.assist && goal.assist.slug === player.slug) {
      player.assists += 1
    }
  })
}

module.exports = { load }
