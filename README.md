# 縮網址產生器

產生縮網址

## 網站畫面

![image](https://github.com/purrup/URL-shortener/blob/master/public/img/index.png)

---

# Installing

1. 下載專案

```
$ git clone https://github.com/purrup/URL-shortener.git
```

進入專案資料夾

```
$ cd URL-shortener-master
```

2. install npm

```
$ npm install
```

3. install MongoDB

4. activate MongoDB

5. activate app.js

```
$ npm run start
```

6. type this URL in your browser

   http://localhost:3000

---

# Features

- 使用者可以輸入網址並產生短網址
- 使用者可以用短網址連向原始網站
- 使用者可以點選連結按鈕複製短網址
- 短網址格式為 5 個英數亂碼組合
- 可以防止重複短網址產生
- 可以防止使用者輸入重複的原始網址
- 輸入重複的原始網址會提示使用者並顯示短網址
- 若使用者沒有輸入內容，就按下了送出鈕，可防止表單送出並提示使用者錯誤訊息

# Tools

- [Express](https://www.npmjs.com/package/express) - 後端框架
- [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) - 模板引擎
- [clipboard.js](https://clipboardjs.com/) - 按鈕複製功能
- [MongoDB](https://www.mongodb.com/) - DB
- [Mongoose](https://www.npmjs.com/package/mongoose) - ODM of MongoDB
- [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/) - IDE
