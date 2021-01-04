const express = require('express')
const path = require('path');
const PORT = process.env.PORT || 5000;

const renderIndexPage = (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
  </head>
  <body>
    <h3>Hello test-one.booking.com!</h3>
    <form action="/user" method="POST">
      Visitor id: <input type="text" name="user" style="width: 300px;">
      <input type="submit" value="Ok">
    </form>
  </body>
</html>`);
};


express()
  .use(express.static(path.join(__dirname, 'public')))
  //.set('views', path.join(__dirname, 'views'))
  //.set('view engine', 'ejs')
  .get('/', renderIndexPage)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))