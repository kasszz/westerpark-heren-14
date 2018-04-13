import listElements from '../../lib/list-elements'

const selector = '[data-graph-selector]'
const selectSelector = '[data-graph-select]'
const graphSelector = '[data-graph]'
const graphTitleAttr = 'data-graph-title'
const hideClass = 'graph--hidden'
const isSupported = document.documentElement.classList && document.querySelectorAll

function enhance (element) {
  const select = element.querySelector(selectSelector)
  const graphs = listElements(element, graphSelector)

  showSelectedGraph(select.value, graphs)

  select.addEventListener('change', () => showSelectedGraph(select.value, graphs))
}

function showSelectedGraph (selectedGraph, graphs) {
  graphs.forEach(graph => {
    if (graph.getAttribute(graphTitleAttr) === selectedGraph) {
      graph.classList.remove(hideClass)
    } else {
      graph.classList.add(hideClass)
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
