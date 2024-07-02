const express = require('express');
const app = express();
console.log("app", app)

app.get('/', function (req, res) {
    res.send("Hello World!");
  });
  
  app.listen(3000);
  