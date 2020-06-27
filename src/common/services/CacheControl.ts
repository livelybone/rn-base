/**
 * 版本命名 X.X.X
 * */
export class AppCache {
  static size = Math.random() * 10000

  static clear() {
    AppCache.size = 0
  }

  static get sizeStr() {
    return (AppCache.size / 1024).toFixed(2) + 'KB'
  }
}
