export function stringifyAttributes(input: object) {
  const attributes: string[] = []
  for (const key of Object.keys(input)) {
    let value = input[key]
    if (value === false) {
      continue
    }
    if (Array.isArray(value)) {
      value = value.join(' ')
    }
    let attribute = key
    if (value !== true) {
      attribute += `="${String(value)}"`
    }
    attributes.push(attribute)
  }
  return attributes.length > 0 ? ' ' + attributes.join(' ') : ''
}
