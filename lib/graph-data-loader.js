const nameFormatter = require('./name-formatter')

function load (data) {
  return [
    getTopScorer(data.players),
    getTopAttendeesTraining(data.players),
    getTopDonators(data.players)
  ]
}

function getTopScorer(players) {
  const data = players.map(player => {
    return {
      label: nameFormatter.criminalName(player.name),
      serieGoals: player.goals,
      serieAssists: player.assists * .5
    }
  })
    .filter(player => player.serieGoals || player.serieAssists)
    .sort((a, b) => (a.serieGoals + a.serieAssists) - (b.serieGoals + b.serieAssists))
    .reverse()
    .slice(0, 10)
    .reverse()

  const labels = data.map(obj => obj.label)
  const series = [
    {name: 'Gescoord', data: data.map(obj => obj.serieGoals)},
    {name: 'Geassist', data: data.map(obj => obj.serieAssists)}
  ]

  return {
    type: 'bar',
    title: 'Topscorer',
    data: {
      labels,
      series
    },
    options: {
      horizontalBars: true,
      stackBars: true,
      axisX: {
        onlyInteger: true
      },
      axisY: {
        offset: 75
      }
    }
  }
}

function getTopAttendeesTraining(players) {
  const data = players.map(player => {
    return {
      label: nameFormatter.criminalName(player.name),
      serie: player.participationTraining
    }
  })
    .filter(player => player.serie)
    .sort((a, b) => a.serie - b.serie)
    .reverse()
    .slice(0, 10)
    .reverse()

  const labels = data.map(obj => obj.label)
  const series = [{
    name: 'Aanwezigheid', data: data.map(obj => obj.serie)
  }]

  return {
    type: 'bar',
    title: 'Aanwezigheid op trainig',
    data: {
      labels,
      series
    },
    options: {
      horizontalBars: true,
      axisX: {
        onlyInteger: true
      },
      axisY: {
        offset: 75
      }
    }
  }
}

function getTopDonators(players) {
  const data = players.map(player => {
    return {
      label: nameFormatter.criminalName(player.name),
      serie: player.beerCardDonations
    }
  })
    .filter(player => player.serie)
    .sort((a, b) => a.serie - b.serie)
    .reverse()
    .slice(0, 10)
    .reverse()

  const labels = data.map(obj => obj.label)
  const series = [{
    name: 'Euro\'s', data: data.map(obj => obj.serie)
  }]

  return {
    type: 'bar',
    title: 'Donaties voor de Bierpas',
    data: {
      labels,
      series
    },
    options: {
      horizontalBars: true,
      axisX: {
        onlyInteger: true
      },
      axisY: {
        offset: 75
      }
    }
  }
}

module.exports = { load }
