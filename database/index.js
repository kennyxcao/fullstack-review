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

// let getTopTwentyFiveWatchersRepos = (callback) => {
//   return Repo.find()
//           .limit(25)
//           .sort('-watchers')
//           .then((results) => {
//             console.log(results);
//             return results;
//           });
// };

// Sample document entry
// { __v: 0,
//   repoID: 18221276,
//   name: 'git-consortium',
//   owner: 'octocat',
//   ownerID: 583231,
//   description: 'This repo is for demonstration purposes only.',
//   htmlURL: 'https://github.com/octocat/git-consortium',
//   cloneURL: 'https://github.com/octocat/git-consortium.git',
//   createdAt: 2014-03-28T17:55:38.000Z,
//   size: 190,
//   forks: 24,
//   watchers: 7,
//   _id: 59c593052695931889f49667 }

module.exports.Repo = Repo;
module.exports.save = save;
