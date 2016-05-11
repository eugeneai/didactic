var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('web'));

app.get('/', function (req, res) {
  //res.send('Hello World!');
  res.render('test', {name:'Linux!'});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
