module.exports = (dato, root) => {
  root.createDataFile('data/players.json', 'json', itemsToJson(dato.players))
  root.createDataFile('data/matches.json', 'json', itemsToJson(dato.matches))
}

function itemsToJson (items) {
  return items.map(itemToJson)
}

function itemToJson (item) {
  const itemJson = item.toMap()
  return removeSeoMetaTags(itemJson)
}

function removeSeoMetaTags (item) {
  if (item && item.seoMetaTags) {
    delete item.seoMetaTags
  }

  if (typeof item === 'object') {
    Object.keys(item).forEach(key => {
      if (Array.isArray(item[key])) {
        item[key].forEach(removeSeoMetaTags)
      } else if (item[key] && typeof item[key] === 'object') {
        removeSeoMetaTags(item[key])
      }
    })
  }
  return item
}
