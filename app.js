const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Url = require('./models/url')
const generateShortUrl = require('./public/javascripts/generateShortUrl')

mongoose.connect('mongodb://localhost/shortURL', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

//顯示首頁
app.get('/', (req, res) => {
  res.render('index')
})

// 新增一個縮網址
app.post('/', (req, res) => {
  const newUrl = new Url({
    originUrl: req.body.originUrl,
    shortUrl: generateShortUrl(),
  })
  console.log(newUrl)
  newUrl.save(err => {
    err ? console.error(err) : res.render('index', { newUrl: newUrl.shortUrl })
  })
})

// 轉址
// app.get('/:shortenUrl', (req, res) => {
//   res.send('shortenUrl')
//   // 從資料庫比對網址，找出原始網址，重新導向
// })

app.listen(port, () => {
  console.log(`APP is running on localhost:${port}`)
})

// 輸入網址 >> 隨機產出5個英文字母及數字的變數 >> 判斷變數是否重複，若重複，重新產生，若無 >> 將原址網址及變數存入資料庫 >> 返回縮網址給使用者，localhost:3000/變數
