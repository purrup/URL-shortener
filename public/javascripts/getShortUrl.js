const Url = require('../../models/url')

// 隨機挑選陣列中的一個值
const randomArr = arr => arr[Math.floor(Math.random() * arr.length)]

// 和Url的shortUrl比對是否有重複
const checkUrl = results => {
  Url.find({ shortUrl: results }, (err, shortUrl) => {
    if (err) return results
    else if (shortUrl) {
      generateShortUrl()
    }
  })
}

const generateShortUrl = () => {
  const lowerCaseLetters = 'abcdefghiklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  const symbols = '`~!@$%^&*()-_+={}[]|;:"<>,.?/'
  // 把變數的材料全部變成陣列放一起
  const originMaterial = [...lowerCaseLetters].concat(
    [...upperCaseLetters],
    [...numbers],
    ...[symbols]
  )
  let results = ''
  // for loop 挑選五個變數
  for (let i = 0; i < 5; i++) {
    results += randomArr(originMaterial)
  }
  console.log(results)

  // 和Url的shortUrl比對是否有重複
  checkUrl(results)

  return results
}

module.exports = getShortUrl
