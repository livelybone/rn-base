import { useEffect } from 'react'
import { Subject } from 'rxjs'

export enum GlobalEventType {
  SetStatusBar,
}

export class EventBus {
  /**
   * dataArgsQueue 用于保证内容至少被消费一次
   * */
  static SubjectsPool: {
    [key in GlobalEventType]?: {
      subject: Subject<any>
      dataArgsQueue: any[][]
    }
  } = {}

  static on(type: GlobalEventType, cb: (...args: any[]) => void) {
    if (!EventBus.SubjectsPool[type])
      EventBus.SubjectsPool[type] = {
        subject: new Subject(),
        dataArgsQueue: [],
      }
    const { subject, dataArgsQueue } = EventBus.SubjectsPool[type]!
    const subscription = subject.subscribe(cb)

    dataArgsQueue.forEach((dataArgs: any[]) => subject.next(...dataArgs))
    EventBus.SubjectsPool[type]!.dataArgsQueue = []

    return subscription
  }

  static emit(type: GlobalEventType, ...dataArgs: any[]) {
    if (!EventBus.SubjectsPool[type])
      EventBus.SubjectsPool[type] = {
        subject: new Subject(),
        dataArgsQueue: [],
      }
    EventBus.SubjectsPool[type]!.subject.next(...dataArgs)
  }

  static emitAndSureBeConsumed(type: GlobalEventType, ...dataArgs: any[]) {
    if (!EventBus.SubjectsPool[type]) {
      EventBus.SubjectsPool[type] = {
        subject: new Subject(),
        dataArgsQueue: [dataArgs],
      }
    } else EventBus.SubjectsPool[type]!.subject.next(...dataArgs)
  }
}

export function useEventBus(
  type: GlobalEventType,
  callback: (...args: any[]) => any,
) {
  useEffect(() => {
    const subscription = EventBus.on(type, callback)
    return () => {
      subscription.unsubscribe()
    }
  }, [callback, type])
}
