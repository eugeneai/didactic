var express = require('express');
var exphbs  = require('express-handlebars');
var fs = require('fs');

var cache = {};

var app = express();
// var template='main';
var template='main-simple';


app.engine('handlebars', exphbs({defaultLayout: template}));
app.set('view engine', 'handlebars');

app.use(express.static('web'));
app.use(express.static('pics'));

app.get('/', function (req, res) {
  //res.send('Hello World!');
  res.render('test', {name:'Linux!'});
});

app.get('/svg/:id', function (req, res) {
  var id=req.params.id;
  svg=load_svg(id);
  res.render('svg', {id:id, svg:svg});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

function load_svg(name) {
  if (name in cache) {
    return cache[name];
  }
  var lines=fs.readFileSync('pics/'+name+'.svg').toString().split("\n");
  lines.shift();
  lines.shift();
  lines.shift();
  var s=lines.join('\n');
  cache[name]=s;
  return s;
};


// Works
