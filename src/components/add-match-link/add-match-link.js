import listElements from '../../lib/list-elements'

const selector = '[data-add-match-link]'
const isSupported = ('addEventListener' in window)

function enhance (element) {
  var xmlHttpRequest = new XMLHttpRequest()

  xmlHttpRequest.addEventListener('load', () => enableLink(element))
  xmlHttpRequest.open('GET', 'http://127.0.0.1:3000/wake-up/')
  xmlHttpRequest.send()
}

function enableLink(element) {
  element.removeAttribute('disabled')
}

function enhanceWithin (context) {
  if (!isSupported) { return [] }
  const elements = listElements(context, selector)
  return elements.map(element => enhance(element))
}

export default {
  enhanceWithin
}
