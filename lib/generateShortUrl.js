const Url = require('../models/url')
const lowerCaseLetters = 'abcdefghiklmnopqrstuvwxyz'
const upperCaseLetters = lowerCaseLetters.toUpperCase()
const numbers = '1234567890'

// 把變數的材料全部變成陣列放一起
// 使用符號時params會無法decoded，無法正確重新導向
const originMaterial = [...lowerCaseLetters, ...upperCaseLetters, ...numbers]
let results = ''

// 隨機挑選陣列中的一個值
const randomArr = arr => arr[Math.floor(Math.random() * arr.length)]

const findUrl = results => {
  return new Promise((resolve, reject) => {
    Url.find({ shortUrl: results }, (err, url) => {
      if (err) return reject(console.error(err))
      //如果縮網址的變數和資料庫重複
      if (url.length > 0) return resolve(generateShortUrl())

      // 如果縮網址變數和資料庫沒有重複
      if (url.length === 0) return resolve(results)
    })
  })
}

// 和Url的shortUrl比對是否有重複
const checkUrl = results => {
  findUrl(results)
}

const generateShortUrl = () => {
  results = ''
  // for loop 挑選五個變數組合
  for (let i = 0; i < 5; i++) {
    results += randomArr(originMaterial)
  }

  // 和Url的shortUrl比對是否有重複
  checkUrl(results)
  return results
}

module.exports = generateShortUrl
