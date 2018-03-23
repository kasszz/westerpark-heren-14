import listElements from '../../lib/list-elements'
import { hasClass, addClass, removeClass } from '../../lib/class-manipulation'

const selector = '[data-site-menu]'
const toggleButtonSelector = '[data-site-menu-toggle]'
const backgroundSelector = '[data-site-menu-background]'
const isOpenClass = 'site-menu--open'
const isSupported = ('addEventListener' in window)

function enhance (element) {
  const toggles = listElements(element, toggleButtonSelector)
  const background = element.querySelector(backgroundSelector)

  toggles.forEach(toggle => toggle.addEventListener('click', event => {
    event.preventDefault()
    toggleClass(element)
  }))

  background.addEventListener('click', () => toggleClass(element))
}

function toggleClass (element) {
  hasClass(element, isOpenClass) ? removeClass(element, isOpenClass) : addClass(element, isOpenClass)
}

function enhanceWithin (context) {
  if (!isSupported) { return [] }
  const elements = listElements(context, selector)
  return elements.map(element => enhance(element))
}

export default {
  enhanceWithin
}
