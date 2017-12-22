export function hasClass (element, className) {
  return !!element.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`))
}

export function addClass (element, className) {
  if (!hasClass(element, className)) {
    element.className += ` ${className}`
  }
}

export function removeClass (element, className) {
  if (hasClass(element, className)) {
    const reg = new RegExp(`(\\s|^)${className}(\\s|$)`)
    element.className = element.className.replace(reg, '')
  }
}
