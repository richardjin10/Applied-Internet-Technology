const express = require('express');
const app = express();
const path = require("path");


app.use(express.urlencoded());
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const logger = (req, res, next) => {
console.log(req.method, req.path, req.query, req.body);
next();
};
app.use(logger);

const picture1 = {
  title: "washington sq arch",
  date: "2018-09-29",
  tags: ['architecture', 'public'],
  art:

 `
  _______________
  |~|_________|~|
  |::::\\^o^/::::|
  ---------------
  |..|/     \\|..|
  ---        ----
  |  |       |  |
  |  |       |  |
  |  |       |  |
 .|__|.     .|__|.`

};

const picture2 = {
  title: "boba",
  date: "2018-09-30",
  tags: ['snack', 'notmybestwork'],
  art:
`
 ======
 /      \\
|        |-.
|        |  \\
|O.o:.o8o|_ /
|.o.8o.O.|
 \\.o:o.o/

  `
};

const picture3 = {
  title: "buddy",
  date: "2018-10-31",
  tags: ['halloween', 'squad', 'fashion'],
  art:
`
___
/  /\\   |---.
|__|/__ |---,\\
|  \`   |=    \`
|      /|
|  .--' |
|   |\  |
|   | \ |
/|   | | |
\/    |  \|
___ /_____\___|\____
`
};



const picture = [picture3, picture2, picture1];
let filteredpicture = [];

app.get('/', function(req, res) {
    res.render('index', {picture});

});

app.get('/filter', function(req, res) {
    const filter = req.query['filter'];
    filteredpicture = [];
    for (let i = 0; i<picture.length; i++){
      for(let j = 0; j<picture[i]['tags'].length; j++){
        if(picture[i]['tags'][j] === filter){
          filteredpicture.push(picture[i]);

        }
      }
    }
    if(filter === ""){
      res.render('index', {picture});
    }else{
      res.render('index', {filteredpicture});
    }
});

app.get('/add', function(req, res) {
    res.render('add');

});


app.post('/add', function(req, res) {
    const name = req.body['name'];
    const date = req.body['date'];
    const tags = req.body['tags'];
    const drawing = req.body['drawing'];

    const splittags = tags.split(",");

    const tempPicture = {
      title: name,
      date: date,
      tags: splittags,
      art: drawing,
    };

    picture.unshift(tempPicture);

    res.redirect('/');

});


app.listen(3000);
console.log('Started server on port 3000');
