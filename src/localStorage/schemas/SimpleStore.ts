export default {
  name: 'SimpleStore',
  primaryKey: 'type',
  properties: {
    type: 'string',
    value: 'string',
  },
}

export function simpleStore(type, value) {
  return { type, value }
}

export const simpleStoreQuery = type => `type = "${type}"`
