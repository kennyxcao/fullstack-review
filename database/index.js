const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repoID: Number, // id
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
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // This function should save a repo or repos to the MongoDB

};

module.exports.save = save;