export default {
  name: 'Msg',
  primaryKey: 'messageId',
  properties: {
    messageId: 'string',
    title: 'string',
    content: 'string',
    createTime: 'date',
    isRead: 'bool',
    taskId: 'string',
    type: 'string',
  },
}
