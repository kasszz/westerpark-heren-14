const splitChar = ','

function fullName (string) {
  return string.replace(RegExp(splitChar, 'g'), '')
}

function firstName (string) {
  return string.split(splitChar)[0]
}

function surname (string) {
  const nameParts = string.split(splitChar)
  return nameParts[nameParts.length - 1]
}

function initials (string) {
  const nameParts = string.split(splitChar)

  return `${firstLetter(nameParts[0].trim())}${firstLetter(nameParts[nameParts.length - 1].trim())}`
}

function firstLetter (string) {
  return string.trim().substr(0, 1)
}

function criminalName (string) {
  return `${firstName(string)} ${firstLetter(surname(string))}.`
}

module.exports = {
  fullName,
  firstName,
  surname,
  initials,
  criminalName
}
