const path = require('path')

const aliasPaths = require('./tsconfig.json').compilerOptions.paths

const alias = Object.entries(aliasPaths).reduce(
  (pre, [key, value]) => ({
    ...pre,
    [key.replace(/\/\*$/, '')]: path.resolve(
      __dirname,
      value[0].replace(/^(.*)\/\*$/, './$1'),
    ),
  }),
  {},
)

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias,
      },
    ],
  ],
}
