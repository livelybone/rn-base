//  getSvg.js
const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')
const { promiseOnPending } = require('@livelybone/singleton')

const svgDir = path.resolve(__dirname, './svg')

// 读取单个文件
function readfile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(svgDir, filename), 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }
      resolve({
        [filename.slice(0, filename.lastIndexOf('.'))]: data.replace(
          /\s+/g,
          ' ',
        ),
      })
    })
  })
}

// 读取SVG文件夹下所有svg
function readSvgs() {
  return new Promise((resolve, reject) => {
    fs.readdir(svgDir, (err, files) => {
      if (err) {
        reject(err)
      }
      Promise.all(files.map(filename => readfile(filename)))
        .then(data => resolve(data))
        .catch(e => reject(e))
    })
  })
}

// 生成js文件
function gnt() {
  return promiseOnPending(
    () =>
      readSvgs()
        .then(data => {
          const svgFile =
            'export const SvgImages = ' +
            JSON.stringify(Object.assign.apply(this, data))

          fs.writeFile(path.resolve(__dirname, './svg.js'), svgFile, err => {
            if (err) {
              throw new Error(err)
            }
            console.log('--------- Svg generate successful ---------')
          })
        })
        .catch(err => {
          throw new Error(err)
        }),
    { id: 'svg-generate', cacheTime: 200 },
  )
}

const isProd = process.env.NODE_ENV === 'production'

if (!isProd) {
  const watcher = chokidar.watch(path.resolve(__dirname, './svg'))

  watcher.on('add', gnt).on('change', gnt).on('unlink', gnt)
} else {
  gnt()
}
