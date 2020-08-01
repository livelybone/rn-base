import json from '../../../package.json'

/**
 * 版本命名 X.X.X
 * */
export const Version = json.version

export const VersionCompare = {
  Equal: 0,
  Low: 1,
}

function dealVersion(version: string) {
  const [c1, c2 = '', c3 = ''] = version.split('.')
  return [+c1, +c2, +c3] as const
}

export function compareVersion(remoteVersion: string) {
  const [c1, c2, c3] = dealVersion(Version)
  const [r1, r2, r3] = dealVersion(remoteVersion)

  if (r1 - c1 > 0) {
    return VersionCompare.Low
  }
  if (r1 - c1 === 0 && r2 - c2 > 0) {
    return VersionCompare.Low
  }
  if (r1 - c1 === 0 && r2 - c2 === 0 && r3 - c3 > 0) {
    return VersionCompare.Low
  }
  return VersionCompare.Equal
}
