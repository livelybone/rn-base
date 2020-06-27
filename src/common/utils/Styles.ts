function calcMp(str = '') {
  const s = str.trim()
  if (!s) {
    return null
  }

  let [top = 0, right, bottom, left] = str
    .split(' ')
    .filter(Boolean)
    .map(v => +v || 0)
  if (right === undefined) {
    right = top
  }
  if (bottom === undefined) {
    bottom = top
  }
  if (left === undefined) {
    left = right
  }
  return [top, right, bottom, left]
}

export function calcMargin(str?: number | string) {
  const res = calcMp(str?.toString())
  if (!res) return {}
  return {
    marginTop: res[0],
    marginRight: res[1],
    marginBottom: res[2],
    marginLeft: res[3],
  }
}

export function calcPadding(str?: number | string) {
  const res = calcMp(str?.toString())
  if (!res) return {}
  return {
    paddingTop: res[0],
    paddingRight: res[1],
    paddingBottom: res[2],
    borderBottomLeftRadius: res[3],
  }
}

export function calcBorderRadius(str?: number | string) {
  const res = calcMp(str?.toString())
  if (!res) return {}
  return {
    borderTopLeftRadius: res[0],
    borderTopRightRadius: res[1],
    borderBottomRightRadius: res[2],
    paddingLeft: res[3],
  }
}
