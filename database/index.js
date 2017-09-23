const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/fetcher', {useMongoClient: true});

let repoSchema = mongoose.Schema({
  repoID: {
    type: Number,
    unique: true
  }, // id
  name: String, // name
  owner: String, // owner.login
  ownerID: Number, // owner.id
  description: String, // description
  htmlURL: String, // html_url
  cloneURL: String, // clone_url
  createdAt: Date, // created_at
  size: Number, // size
  forks: Number, // forks
  watchers: Number // watchers
});

let Repo = mongoose.model('Repo', repoSchema);

let formatNewRecord = (record, raw) => {
  if (!!record) {
    return false;
  }
  return {
    repoID: raw.id, // id
    name: raw.name, // name
    owner: raw.owner.login, // owner.login
    ownerID: raw.owner.id, // owner.id
    description: raw.description, // description
    htmlURL: raw['html_url'], // html_url
    cloneURL: raw['clone_url'], // clone_url
    createdAt: raw['created_at'], // created_at
    size: raw.size, // size
    forks: raw.forks, // forks
    watchers: raw.watchers // watchers      
  };
};

let save = (repos) => { 
  // Input: Array of parsed JSON objects
  // Output: Promise to insert new repo entries
  return Promise.map(repos, (repo) => Repo.findOne({repoID: repo.id}).exec())
          .then((filteredRecords) => filteredRecords.map((record, i) => formatNewRecord(record, repos[i])).filter((record) => record))
          .then((newEntries) => Promise.map(newEntries, (newEntry) => Repo.create(newEntry)));
};

module.exports.Repo = Repo;
module.exports.save = save;
