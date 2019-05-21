const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Url = require('./models/url')
const generateShortUrl = require('./public/javascripts/generateShortUrl')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shortURL', {
  useNewUrlParser: true,
  useCreateIndex: true,
})
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
  // 判斷此網址有無在Url中
  Url.findOne(
    {
      originUrl: req.body.originUrl,
    },
    (err, url) => {
      if (err) console.error(err)
      //如果沒有重複的原始網址，新增縮網址
      if (!url) {
        const newUrl = new Url({
          originUrl: req.body.originUrl,
          shortUrl: generateShortUrl(),
        })
        newUrl.save(err => {
          err
            ? console.error(err)
            : res.render('index', { newUrl: newUrl.shortUrl })
        })
      } else {
        // 如果有重複的原始網址
        const existedOriginUrl = url.shortUrl
        return res.render('index', { existedOriginUrl })
      }
    }
  )
})

// 轉址
app.get('/:shortenUrl', (req, res) => {
  // 從資料庫比對網址，找出原始網址，重新導向
  Url.find(
    {
      shortUrl: req.params.shortenUrl,
    },
    (err, url) => {
      if (err) console.error(err)
      // 取出的 url 是陣列
      res.redirect(`${url[0].originUrl}`)
    }
  )
})

app.listen(process.env.PORT || port, () => {
  console.log(`APP is running on localhost:${port}`)
})
