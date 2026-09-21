export function filterEmptyValues(values: object) {
  return Object.fromEntries(
    Object.entries(values).filter(([, value]) => {
      if (typeof value === 'string') return value.length !== 0
      if (Array.isArray(value)) return value.length !== 0
      return value !== null && value !== undefined
    })
  )
}