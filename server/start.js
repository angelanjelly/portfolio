var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8080;

var rootPath = path.join(__dirname, '../');

var indexHtmlPath = path.join(rootPath, './browser/html/index.html')

app.use(express.static(rootPath + '/browser'));
app.use(express.static(rootPath + '/public'));
app.use(express.static(rootPath + '/node_modules'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  if (path.extname(req.path).length > 0) {
      res.status(404).end();
  } else {
      next(null);
  }
});

app.get('/*', function(req, res) {
  res.sendFile(indexHtmlPath);
});

app.use(function(err, req, res, next) {
  console.error('Error:', err.message);
  res.status(err.status || 500).send(err.message);
});

app.listen(port);
console.log('Successfully connected! ' + port);
