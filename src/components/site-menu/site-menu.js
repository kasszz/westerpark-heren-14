import listElements from '../../lib/list-elements'
import { hasClass, addClass, removeClass } from '../../lib/class-manipulation'

const selector = '[data-site-menu]'
const toggleButtonSelector = '[data-site-menu-toggle]'
const isOpenClass = 'site-menu--open'
const isSupported = ('addEventListener' in window)

function enhance (element) {
  const toggles = listElements(element, toggleButtonSelector)

  toggles.forEach(toggle => {
    toggle.addEventListener('click', event => {
      hasClass(element, isOpenClass) ? removeClass(element, isOpenClass) : addClass(element, isOpenClass)
      event.preventDefault()
    })
  })
}

function enhanceWithin (context) {
  if (!isSupported) { return [] }
  const elements = listElements(context, selector)
  return elements.map(element => enhance(element))
}

export default {
  enhance,
  enhanceWithin,
  isSupported
}
