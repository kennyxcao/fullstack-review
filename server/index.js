const express = require('express');
const bodyParser = require('body-parser');
const helpers = require('../helpers/github');
const db = require('../database/index');



let app = express();

// Express JS body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helpers.setHeaders);


app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let username = req.body.term;
  
  helpers.getReposByUsername(username, (repos) => {
    if (repos.length > 0) {
      db.save(repos);
    }
  });
    
  res.status(201).send();
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  
  // Get top 25 repos based on watchers
  db.Repo.find('watchers')
        .limit(25)
        .exec((err, docs) => {
          if (err) { console.error(err); }
          console.log(docs);
          res.set('Content-Type', 'application/json');          
          res.send(JSON.stringify(docs));
        });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

