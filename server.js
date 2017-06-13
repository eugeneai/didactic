var express = require('express');
var exphbs  = require('express-handlebars');
var fs = require('fs');

var cache = {};

var app = express();
var template='main';
// var template='main-simple';


app.engine('handlebars', exphbs({defaultLayout: template}));
app.set('view engine', 'handlebars');

app.use(express.static('web'));
app.use(express.static('pics'));


app.get('/', function (req, res) {
  //res.send('Hello World!');
  res.render('test', {name:'Linux!'});
});

app.get('/numbers', function (req, res) {
  res.render('numbers');
});

app.get('/svg/:id', function (req, res) {
  var id=req.params.id;
  svg=load_svg(id);
  res.render('svg', {id:id, svg:svg});
});
function shuffle(array) { // Knut's algorithm
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

app.get("/test", function (req, res) {
  var q = randomInteger(1,50);
  var a = q+1;
  var svg=load_svg('after');
  var answers = [];
  for(var i=0;i<3;i++){
	  answers.push(randomInteger(1,50));
  }
  answers.push(a);
  answers = shuffle(answers);
  res.render('card', {queeze:q, answer:a, svg:svg, answers:answers});
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
  lines.pop();
  var last=lines.pop();
  var s=lines.join('\n');

  /*
  s+="\n"+`
  <animateTransform
      xlink:href="#leave"
    attributeType="XML"
    attributeName="transform"
    type="translate"
    from="0,0" to="443,701"
    begin="0s" dur="1"

   />

  `+"\n";
  */

  s+="\n"+last+" <!-- comment --> \n";

  cache[name]=s;
  return s;
};


// Works
