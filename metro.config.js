/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 * https://facebook.github.io/metro/docs/configuration
 *
 * @format
 */

module.exports = {
  resolver: {
    resolverMainFields: ['module', 'browser', 'main'],
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
}
