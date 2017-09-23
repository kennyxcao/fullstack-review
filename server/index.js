const express = require('express');
const bodyParser = require('body-parser');
const helpers = require('../helpers/github');
const db = require('../database/index');
const Promise = require('bluebird');

let app = express();

// Express JS body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helpers.setHeaders);
app.use(express.static(__dirname + '/../client/dist'));

// This route should take the github username provided and get the repo information from the github API, then save the repo information in the database
app.post('/repos', function (req, res) {
  let username = req.body.term;
  helpers.getReposByUsername(username, (repos) => {
    if (repos.length > 0) {
      db.save(repos)
        .then((results) => {
          console.log(results.length + ' New Entries Added');
          res.status(201).send();
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send();
        });
    }
  });
});

// This route should send back the top 25 repos based on watchers count
app.get('/repos', function (req, res) {
  db.Repo.find()
        .sort('-watchers')
        .limit(25)
        .exec((err, docs) => {
          if (err) { console.error(err); }
          res.set('Content-Type', 'application/json');          
          res.send(JSON.stringify(docs));
        });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

