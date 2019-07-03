const express = require('express');
const app = express();
const path = require("path");
require( './db' );
const mongoose = require('mongoose');
const Sound = mongoose.model('Sound');
const session = require('express-session');


app.use(express.urlencoded());
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const sessionOptions = {
	secret: 'secret for signing session id',
	saveUninitialized: false,
	resave: false,


};
app.use(session(sessionOptions));

const logger = (req, res, next) => {
console.log(req.method, req.path, req.query, req.body);
next();
};
app.use(logger);


app.get('/', function(req, res) {
    if(isNaN(req.session.count)){
      req.session.count = 0;
      req.session.sounds = [];
    }else{
      req.session.count += 1;
    }

    const what = req.query.what;
    const where = req.query.where;
    const date = req.query.date;
    const hour = req.query.hour;
    const query = {};

    if(what!=="" & what!==undefined){
      query.what = what;
    }
    if(where!=="" & what!==undefined){
      query.where = where;
    }
    if(date!=="" & what!==undefined){
      query.date = date;
    }
    if(hour!=="" & what!==undefined){
      query.hour = hour;
    }



    Sound.find(query, function(err, sound, count){

      res.render('index', {
        sound:sound,
        count:req.session.count
      }, );
    });


});

app.get('/sounds/add', function(req, res) {
	if(isNaN(req.session.count)){
		req.session.count = 0;
		req.session.sounds = [];
	}else{
		req.session.count += 1;
	}
    res.render('add',{
      count:req.session.count
    });


});

app.post('/sounds/add', function(req, res) {
    const what = req.body.what;
    const where = req.body.where;
    const date = req.body.date;
    const hour = req.body.hour;
    const desc = req.body.desc;


    const tempsound = {
      what:what,
      where:where,
      date:date,
      hour:hour,
      desc:desc,
    };

    const temparray = req.session.sounds;
    temparray.push(tempsound);
    req.session.sounds=temparray;


    new Sound({
      what:what,
      where:where,
      date:date,
      hour:hour,
      desc:desc,
    }).save(function(err, sound, count){
      res.redirect('/');
    });


});

app.get('/sounds/mine', function(req, res) {
	if(isNaN(req.session.count)){
		req.session.count = 0;
		req.session.sounds = [];
	}else{
		req.session.count += 1;
	}
    res.render('mine',{
      sessionsound:req.session.sounds,
      count: req.session.count
    });


});

app.listen(3000);
console.log('Started server on port 3000');
