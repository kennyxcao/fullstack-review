const request = require('request');
const config = require('../config.js');

let getReposByUsername = (githubHandle, callback) => {
  // Use the request module to request repos for a specific user from the github API
  let options = {
    url: `https://api.github.com/users/${githubHandle}/repos`,
    headers: {
      'User-Agent': 'kennyxcao',
      'Authorization': `token ${config.TOKEN}`
    }
  }; 
  request.get(options, function(error, response, body) {
    if (error) { console.error(error); }
    let repos = JSON.parse(body); // repos in json format
    callback(repos); // invoke save() from database/index.js
  });

};

let setHeaders = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*' );
  res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  //console.log(res.header()._headers);
  next();
};

module.exports.getReposByUsername = getReposByUsername;
module.exports.setHeaders = setHeaders;

// - Use bodyParser npm module instead -
// let parseBody = (req, res, next) => {
//   var body = [];
//   req.on('data', (chunk) => body.push(chunk));
//   req.on('end', () => {
//     body = [].concat(body).toString();
//     if (body) {
//       req.body = JSON.parse(body);      
//     }
//     next();
//   });
// };
// module.exports.parseBody = parseBody;