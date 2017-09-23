import React from 'react';

const RepoListEntry = (props) => (
  <li>
    User: {props.repo.owner} &emsp;  Watchers: {props.repo.watchers} &emsp; Repo: <a href={props.repo.htmlURL}>{props.repo.name}</a> 
  </li>
);

export default RepoListEntry;

// arr.push({
//   repoID: repo.id, // id
//   name: repo.name, // name
//   owner: repo.owner.login, // owner.login
//   ownerID: repo.owner.id, // owner.id
//   description: repo.description, // description
//   htmlURL: repo['html_url'], // html_url
//   cloneURL: repo['clone_url'], // clone_url
//   createdAt: repo['created_at'], // created_at
//   size: repo.size, // size
//   forks: repo.forks, // forks
//   watchers: repo.watchers // watchers  
// });