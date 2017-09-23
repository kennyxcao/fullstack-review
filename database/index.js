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
  watchers: Number, // watchers
  stars: Number // stargazers_count
});

let Repo = mongoose.model('Repo', repoSchema);

let formatNewRecord = (record, raw) => {
  if (!!record) {
    return false;
  }
  return {
    repoID: raw.id,
    name: raw.name,
    owner: raw.owner.login,
    ownerID: raw.owner.id,
    description: raw.description,
    htmlURL: raw['html_url'],
    cloneURL: raw['clone_url'],
    createdAt: raw['created_at'],
    size: raw.size,
    forks: raw.forks,
    watchers: raw.watchers,
    stars: raw['stargazers_count']
  };
};

let save = (repos) => { 
  // I: Array of parsed JSON objects
  // O: Promise to insert new repo entries
  
  // Find, update or insert method
  return Promise.map(repos, (repo) => Repo.findOneAndUpdate({repoID: repo.id}, formatNewRecord(null, repo), {upsert: true, setDefaultsOnInsert: true}).exec());

  // *********** Create each repo entry and handle duplicate error gracefully ****************************
  // return Promise.map(repos, (repo) => new Repo(formatNewRecord(null, repo)).save().catch(err => err));
  // return Promise.map(repos, (repo) => Repo.create(formatNewRecord(null, repo)).catch(err => err));

  // *********** Filter out duplicate repo manually - not needed if catch duplicate error from mongodb gracefully **************************
  // return Promise.map(repos, (repo) => Repo.findOne({repoID: repo.id}).exec())
  //         .then((filteredRecords) => filteredRecords.map((record, i) => formatNewRecord(record, repos[i])).filter((record) => record))
  //         .then((newEntries) => Promise.map(newEntries, (newEntry) => Repo.create(newEntry)));
};

module.exports.Repo = Repo;
module.exports.save = save;
