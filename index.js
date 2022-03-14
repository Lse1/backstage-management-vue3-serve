const User = require('./models')
const commodity = require('./commodity')
const Shop = require('./shop')
const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, "../CommodityData/images")))
app.all("*", function (req, res, next) {
  // //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  // //允许的header类型
  res.header("Access-Control-Allow-Headers", "X-Token,content-type,Authorization");
  // //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
})

app.use("/", User)
app.use("/", commodity)
app.use("/", Shop)

app.use((req, res) => {
  //建立一个filepath
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  let extname = path.extname(filePath);

  //初始化内容类型
  let contentType = 'text/html';

  switch (extname) {
    case '.js':
      contentType = 'text/javascript'
      break;
    case '.css':
      contentType = 'text/css'
      break;
    case '.json':
      contentType = 'application/json'
      break;
    case '.png':
      contentType = 'image/png'
      break;
    case '.jpg':
      contentType = 'image/jpg'
      break;
    default:
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        //Page Not Found
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.end(content, 'utf8')
        })
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`)
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      // res.end(content,'utf-8');
      res.end(content, 'utf8')
    }
  })
})

const RORT = process.env.PORT || 3003;
const host = process.env.HOST || ''
app.listen(RORT, host, () => {
  console.log("监听在3003端口", RORT, host)
})