const request = require('request');
const config = require('../config.js');

let getReposByUsername = (githubHandle, callback) => {
  // TODO - Use the request module to request repos for a specific user from the github API
  // The options object has been provided to help you out, but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${githubHandle}/repos`,
    headers: {
      'User-Agent': 'kennyxcao',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  
  request.get(options, function(error, response, body) {
    if (error) { console.log(error); }
    let repos = JSON.parse(body); // repos in json format
    callback(repos);
  });

};

module.exports.getReposByUsername = getReposByUsername;