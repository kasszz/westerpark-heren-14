import chartist from 'chartist'
import legend from 'chartist-plugin-legend'
import listElements from '../../lib/list-elements'

const selector = '[data-graph]'
const scriptSelector = '[data-graph-dataset]'
const typeAttr = 'data-graph-type'
const optionsAttr = 'data-graph-options'
const isSupported = true

function enhance (element) {
  const script = element.querySelector(scriptSelector)
  const type = script.getAttribute(typeAttr)
  const data = JSON.parse(script.innerHTML)
  const options = JSON.parse(script.getAttribute(optionsAttr))

  Object.assign(options, {
    height: 400,
    plugins: [
      legend({clickable: false})
    ]
  })

  if(type === 'bar') {
    return new chartist.Bar(element, data, options)
  }
}

function enhanceWithin (context) {
  if (!isSupported) { return [] }
  const elements = listElements(context, selector)
  return elements.map(element => enhance(element))
}

export default {
  enhanceWithin
}
