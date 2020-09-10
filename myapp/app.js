var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, username: '' }));

//--------------------------------------------------------------------

var users = [{ name: 'a', password: 'a' }];
var usersJ = JSON.stringify(users);
fs.writeFileSync('users.json', usersJ);

var watchlist = [];
var watchlistJ = JSON.stringify(watchlist);
fs.writeFileSync('watchlist.json', watchlistJ);

var movies = ['the godfather', 'the godfather: part 2', 'scream', 'the dark knight', 'fight club', 'the conjuring'];

app.get('/', function (req, res) {
  res.render('login');
});

app.get('/registration', function (req, res) {
  res.render('registration');
});

app.get('/home', function (req, res) {
  res.render('home');
});

app.get('/drama', function (req, res) {
  res.render('drama');
});

app.get('/action', function (req, res) {
  res.render('action');
});

app.get('/horror', function (req, res) {
  res.render('horror');
});

app.get('/watchlist', function (req, res) {
  var watchlistUser = [];

  var watchlistJson = fs.readFileSync('watchlist.json');
  var watchlistString = JSON.parse(watchlistJson);
  var username = req.session.username;
  for (i = 0; i < watchlistString.length; i++) {
    if (watchlistString[i].name == username) {
      watchlistUser.push(watchlistString[i].movie)
    }
  }
  watchlistJson = JSON.stringify(watchlistString);
  fs.writeFileSync('watchlist.json', watchlistJson);
  res.render('watchlist', { watchlist: watchlistUser });
  watchlistUser = [];
});

app.get('/conjuring', function (req, res) {
  res.render('conjuring');
});

app.get('/darkknight', function (req, res) {
  res.render('darkknight');
});

app.get('/godfather', function (req, res) {
  res.render('godfather');
});

app.get('/godfather2', function (req, res) {
  res.render('godfather2');
});

app.get('/fightclub', function (req, res) {
  res.render('fightclub');
});

app.get('/scream', function (req, res) {
  res.render('scream');
});

app.post('/', function (req, res) {
  var usersJson = fs.readFileSync('users.json');
  var usersString = JSON.parse(usersJson);
  var username = req.body.username;
  var pass = req.body.password;
  req.session.username = req.body.username;
  var i;
  if (usersString.length == 0) {
    res.send("User not found!");
  }
  else {
    for (i = 0; i < usersString.length; i++) {
      if (usersString[i].name == username) {
        if (usersString[i].password == pass) {
          res.redirect('home');
          return;
        }
        else {
          res.send("Password incorrect!");
          return;
        }
      }
    }
    res.send("User not found!");
  }
});

app.post('/register', function (req, res) {
  var usersJson = fs.readFileSync('users.json');
  var usersString = JSON.parse(usersJson);
  var username = req.body.username;
  var pass = req.body.password;
  req.session.username = req.body.username;
  var i;
  if (username.length == 0) {
    res.send("Username cannot be empty!");
    return;
  }
  if (pass.length == 0) {
    res.send("Password cannot be empty!");
    return;
  }
  if (usersString.length == 0) {
    var user = { name: username, password: pass };
    usersString.push(user);
    usersJson = JSON.stringify(usersString);
    fs.writeFileSync('users.json', usersJson);
    res.send("Registration successful!");
    return;
  }
  else {
    for (i = 0; i < usersString.length; i++) {
      if (usersString[i].name == username) {
        res.send("Username already taken!");
        return;
      }
      else {
        var user = { name: username, password: pass };
        usersString.push(user);
        usersJson = JSON.stringify(usersString);
        fs.writeFileSync('users.json', usersJson);
        res.send("Registration successful!");
        return;
      }
    }
  }
});

app.post('/conjuring', function (req, res) {
  var watchlistJson = fs.readFileSync('watchlist.json');
  var watchlistString = JSON.parse(watchlistJson);
  var username = req.session.username;
  for (i = 0; i < watchlistString.length; i++) {
    if (watchlistString[i].name == username) {
      if (watchlistString[i].movie == "conjuring") {
        res.send("Movie already in watchlist!");
        return;
      }
    }
  }
  var watchlistEntry = { name: req.session.username, movie: "conjuring" };
  watchlistString.push(watchlistEntry);
  watchlistJson = JSON.stringify(watchlistString);
  fs.writeFileSync('watchlist.json', watchlistJson);
  return;
});

app.post('/darkknight', function (req, res) {
  var watchlistJson = fs.readFileSync('watchlist.json');
  var watchlistString = JSON.parse(watchlistJson);
  var username = req.session.username;
  for (i = 0; i < watchlistString.length; i++) {
    if (watchlistString[i].name == username) {
      if (watchlistString[i].movie == "darkknight") {
        res.send("Movie already in watchlist!");
        return;
      }
    }
  }
  var watchlistEntry = { name: req.session.username, movie: "darkknight" };
  watchlistString.push(watchlistEntry);
  watchlistJson = JSON.stringify(watchlistString);
  fs.writeFileSync('watchlist.json', watchlistJson);
  return;
});

app.post('/scream', function (req, res) {
  var watchlistJson = fs.readFileSync('watchlist.json');
  var watchlistString = JSON.parse(watchlistJson);
  var username = req.session.username;
  for (i = 0; i < watchlistString.length; i++) {
    if (watchlistString[i].name == username) {
      if (watchlistString[i].movie == "scream") {
        res.send("Movie already in watchlist!");
        return;
      }
    }
  }
  var watchlistEntry = { name: req.session.username, movie: "scream" };
  watchlistString.push(watchlistEntry);
  watchlistJson = JSON.stringify(watchlistString);
  fs.writeFileSync('watchlist.json', watchlistJson);
  return;
});

app.post('/godfather', function (req, res) {
  var watchlistJson = fs.readFileSync('watchlist.json');
  var watchlistString = JSON.parse(watchlistJson);
  var username = req.session.username;
  for (i = 0; i < watchlistString.length; i++) {
    if (watchlistString[i].name == username) {
      if (watchlistString[i].movie == "godfather") {
        res.send("Movie already in watchlist!");
        return;
      }
    }
  }
  var watchlistEntry = { name: req.session.username, movie: "godfather" };
  watchlistString.push(watchlistEntry);
  watchlistJson = JSON.stringify(watchlistString);
  fs.writeFileSync('watchlist.json', watchlistJson);
  return;
});

app.post('/godfather2', function (req, res) {
  var watchlistJson = fs.readFileSync('watchlist.json');
  var watchlistString = JSON.parse(watchlistJson);
  var username = req.session.username;
  for (i = 0; i < watchlistString.length; i++) {
    if (watchlistString[i].name == username) {
      if (watchlistString[i].movie == "godfather2") {
        res.send("Movie already in watchlist!");
        return;
      }
    }
  }
  var watchlistEntry = { name: req.session.username, movie: "godfather2" };
  watchlistString.push(watchlistEntry);
  watchlistJson = JSON.stringify(watchlistString);
  fs.writeFileSync('watchlist.json', watchlistJson);
  return;
});

app.post('/fightclub', function (req, res) {
  var watchlistJson = fs.readFileSync('watchlist.json');
  var watchlistString = JSON.parse(watchlistJson);
  var username = req.session.username;
  for (i = 0; i < watchlistString.length; i++) {
    if (watchlistString[i].name == username) {
      if (watchlistString[i].movie == "fightclub") {
        res.send("Movie already in watchlist!");
        return;
      }
    }
  }
  var watchlistEntry = { name: req.session.username, movie: "fightclub" };
  watchlistString.push(watchlistEntry);
  watchlistJson = JSON.stringify(watchlistString);
  fs.writeFileSync('watchlist.json', watchlistJson);
  return;
});

app.post('/search', function (req, res) {
  var search = [];
  var searchKeyword = (req.body.Search).toLowerCase();
  var found = false;
  for (i = 0; i < movies.length; i++) {
    if (movies[i].includes(searchKeyword)) {
      found = true;
      search.push(movies[i]);
    }
  }
  if (found == false)
    res.send("Movie not found");
  else
    res.render('searchresults', { search: search });
  search = [];
});

if (process.env.PORT) {
  app.listen(process.env.PORT, function () {
    console.log('Server Started');
  });
}
else {
  app.listen(3000, () => {
    console.log('server is running');
  });
}

module.exports = app;
