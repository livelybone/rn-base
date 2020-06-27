# MyApp

Integrated:
1. [react-navigation](https://reactnavigation.org) --- Solution of screen view management
2. [react-native-svg](https://www.npmjs.com/package/react-native-svg) --- Solution of svg resource
3. [realm](https://www.npmjs.com/package/realm) --- Solution of localStorage
4. redux --- Solution of global state management
6. [react-native-camera](https://www.npmjs.com/package/react-native-camera) --- Solution of camera using
6. [react-native-webview](https://www.npmjs.com/package/react-native-camera) --- Solution of html render
7. Some basic wrapped component
8. rxjs --- Solution for data subscription

Some prepare
```bash
# rename the app
sh rename.sh YourAppName

# install dependencies
npm i --registry=http://registry.npm.taobao.org
```

## Android
```bash
# develop
npm run android

# build
npm run build:android
```

## iOS
```bash
# install dependencies
npm run pod

# develop, include `npm run pod`
npm run ios

# build
npm run build:ios
```

