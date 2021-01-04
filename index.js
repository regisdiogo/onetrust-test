const express = require('express')
const path = require('path');
const {
  cookieBanner,
  getUser
} = require('./cookieBanner');
const PORT = process.env.PORT || 5000;

const user = getUser();

const renderIndexPage = (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
    ${cookieBanner('7d07b58a-5f7f-44bc-9e9f-d24d0d218497', user.id)}
  </head>
  <body>
    <h3>Hello test-one.booking.com!</h3>
    <form action="/user" method="POST">
      Visitor id: <input type="text" name="user" value="${user.id}" style="width: 300px;">
      <input type="submit" value="Ok">
    </form>
  </body>
</html>`);
};

const handleChangeUser = (req, res) => {
  user.id = req.body.user;
  res.redirect('/');
};

express()
  .use(express.static(path.join(__dirname, 'public')))
  //.set('views', path.join(__dirname, 'views'))
  //.set('view engine', 'ejs')
  .use(express.urlencoded({
    extended: true
  }))
  .get('/', renderIndexPage)
  .post('/user', handleChangeUser)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))