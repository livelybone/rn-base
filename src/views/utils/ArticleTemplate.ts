import { ArticleItem } from '@/api/Msg'
import { DPI } from '@utils/Env'

const style = `
body {
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 10px 20px;
  font-size: 13px;
  overflow: hidden;
}

#title {
  line-height: 24px;
  font-size: 17px;
  font-weight: 600;
  color: #333;
}

.time-author {
  margin: 20px 0;
  font-size: 12px;
  color: #939AA2;
}

#content {
  width: 100%;
  line-height: 21px;
}

#content img, #content video {
  max-width: 100%;
  width: 100%;
}

#content p {
  width: 100%;
  margin: 5px 0 0;
}
`.replace(/\s(\d+)px(?=;|\s)/g, (matches, m1) => {
  return ` ${m1 * DPI}px`
})

export default `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
  ${style}
  </style>
</head>
<body>
<h1 id="title"></h1>
<p class="time-author">
  <time id="time"></time>
  <span></span>
  <span id="author"></span>
</p>
<div id="content"></div>
<script>
  function getEl(id) {
    return document.getElementById(id)
  }

  var title = getEl('title')
  var time = getEl('time')
  var author = getEl('author')
  var content = getEl('content')

  function renderInfo($info) {
    if ($info) {
      title.innerHTML = $info.title || ''
      time.innerHTML = $info.time || ''
      author.innerHTML = $info.author || ''
      content.innerHTML = $info.content || ''
    }
  }
</script>
</body>
</html>
`

export function injectedJavaScript(info: ArticleItem | null) {
  return `renderInfo(${JSON.stringify(info || null)})`
}
