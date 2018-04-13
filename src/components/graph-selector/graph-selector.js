import graph from '../graph/graph'
import listElements from '../../lib/list-elements'

const selector = '[data-graph-selector]'
const selectSelector = '[data-graph-select]'
const graphTitleAttr = 'data-graph-title'
const hideClass = 'graph--hidden'
const isSupported = document.documentElement.classList && document.querySelectorAll

function enhance (element) {
  const graphs = graph.enhanceWithin(element)
  const select = element.querySelector(selectSelector)

  showSelectedGraph(select.value, graphs)

  select.addEventListener('change', () => showSelectedGraph(select.value, graphs))
}

function showSelectedGraph (selectedGraph, graphs) {
  graphs.forEach(graph => {
    const element = graph.container
    if (element.getAttribute(graphTitleAttr) === selectedGraph) {
      element.classList.remove(hideClass)
      graph.update()
    } else {
      element.classList.add(hideClass)
    }
  })
}

function enhanceWithin (context) {
  if (!isSupported) { return [] }
  const elements = listElements(context, selector)
  return elements.map(element => enhance(element))
}

export default {
  enhanceWithin
}
