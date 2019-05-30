const express = require('express')
const app = express()
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Url = require('./models/url')
const generateShortUrl = require('./lib/generateShortUrl')

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

// 判斷原網址有無在Url中
const findOriginUrl = url => {
  return new Promise((resolve, reject) => {
    Url.findOne(
      {
        originUrl: url,
      },
      (err, url) => {
        err ? reject(console.error(err)) : resolve(url)
      }
    )
  })
}

// 判斷短網址有無在Url中
const findShortUrl = url => {
  return new Promise((resolve, reject) => {
    Url.findOne(
      {
        shortUrl: url,
      },
      (err, url) => {
        err ? reject(console.error(err)) : resolve(url)
      }
    )
  })
}

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
  ;(async function start() {
    try {
      let url = await findOriginUrl(req.body.originUrl)
      const domainUrl = process.env.HEROKU_URL || 'http://localhost:3000/'
      if (!url) {
        const newUrl = new Url({
          originUrl: req.body.originUrl,
          shortUrl: generateShortUrl(),
        })
        newUrl.save(err => {
          err
            ? console.error(err)
            : res.render('index', { newUrl: domainUrl + newUrl.shortUrl })
        })
      } else {
        // 如果有重複的原始網址，回傳給使用者知道
        const existedOriginUrl = domainUrl + url.shortUrl
        return res.render('index', { existedOriginUrl })
      }
    } catch (e) {
      console.log(e)
    }
  })()
})

// 轉址
app.get('/:shortenUrl', (req, res) => {
  // 從資料庫比對網址，找出原始網址，重新導向
  ;(async function start() {
    try {
      let url = await findShortUrl(req.params.shortenUrl)
      url ? res.redirect(url.originUrl) : res.redirect('/')
    } catch (e) {
      console.log(e)
    }
  })()
})

app.listen(process.env.PORT || port, () => {
  console.log(`APP is running on localhost:${port}`)
})
