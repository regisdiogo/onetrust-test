const express = require('express')
const path = require('path');
const cookieParser = require('cookie-parser');
const {
  cookieBanner,
  getUser
} = require('./cookieBanner');
const PORT = process.env.PORT || 5000;

const renderIndexPage = (req, res) => {
  let userId;
  console.log(req.cookies);
  if (req.cookies.userId) {
    userId = req.cookies.userId;
  } else {
    userId = getUser();
    res.cookie('userId', userId, {
      httpOnly: true
    });
  }
  res.set('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
    ${cookieBanner('7d07b58a-5f7f-44bc-9e9f-d24d0d218497', userId)}
  </head>
  <body>
    <h3>Hello test-one.booking.com!</h3>
    <form action="/user" method="POST">
      Visitor id: <input type="text" name="user" value="${userId}" style="width: 300px;">
      <input type="submit" value="Ok">
    </form>
  </body>
</html>`);
};

const handleChangeUser = (req, res) => {
  let userId = req.body.user;
  res.cookie('userId', userId, {
    httpOnly: true
  });
  res.redirect('/');
};

express()
  .use(cookieParser())
  .use(express.urlencoded({
    extended: true
  }))
  .get('/', renderIndexPage)
  .post('/user', handleChangeUser)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))