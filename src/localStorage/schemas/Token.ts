export default {
  name: 'Token',
  primaryKey: 'type',
  properties: {
    type: 'string',
    value: 'string',
  },
}

export function signInToken(value) {
  return { type: 'sign-in', value }
}

export const tokenQuery = 'type = "sign-in"'
