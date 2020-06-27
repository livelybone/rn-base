export function getWithoutProps(obj, keys: string[]) {
  return Object.entries(obj).reduce(
    (pre, [key, value]) => ({
      ...pre,
      ...(!keys.includes(key) ? { [key]: value } : {}),
    }),
    {},
  )
}

export function getPartialProps(obj, keys: string[]) {
  return Object.entries(obj).reduce(
    (pre, [key, value]) => ({
      ...pre,
      ...(keys.includes(key) ? { [key]: value } : {}),
    }),
    {},
  )
}
