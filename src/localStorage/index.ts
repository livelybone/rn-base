import Realm from 'realm'
import Msg from './schemas/Msg'
import SimpleStore from './schemas/SimpleStore'
import Token from './schemas/Token'
import { promisefy } from '@utils/CommonFn'

declare global {
  interface Global {
    realm: Realm
  }
}

export default class LocalStorage {
  static async init() {
    global.realm = await Realm.open({ schema: [Token, SimpleStore, Msg] })
  }

  static write() {
    return promisefy(global.realm.write.bind(global.realm))()
  }

  static async create(schemaName: string, item: Realm.ObjectPropsType) {
    await LocalStorage.write()
    return global.realm.create(schemaName, item, Realm.UpdateMode.Never)
  }

  static async update(schemaName: string, item: Realm.ObjectPropsType) {
    await LocalStorage.write()
    return global.realm.create(schemaName, item, Realm.UpdateMode.Modified)
  }

  static async batchUpdate(schemaName: string, items: Realm.ObjectPropsType[]) {
    await LocalStorage.write()
    return items.map(item =>
      global.realm.create(schemaName, item, Realm.UpdateMode.Modified),
    )
  }

  static query<T = { [key: string]: any }>(schemaName: string, query) {
    if (!query) {
      return global.realm.objects<T>(schemaName)
    }
    return global.realm.objects<T>(schemaName)?.filtered(query)
  }

  static delete(schemaName: string, query: string) {
    const result = LocalStorage.query(schemaName, query)
    return result.length > 0 && global.realm.delete(result)
  }
}
