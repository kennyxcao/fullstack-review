import React from 'react';

const RepoListEntry = (props) => (
  <li>
    User: {props.repo.owner} &emsp;  Stars: {props.repo.stars} &emsp; Repo: <a href={props.repo.htmlURL}>{props.repo.name}</a> 
  </li>
);

export default RepoListEntry;

// REPO FORMAT
// repoID: repo.id,
// name: repo.name,
// owner: repo.owner.login,
// ownerID: repo.owner.id,
// description: repo.description,
// htmlURL: repo['html_url'],
// cloneURL: repo['clone_url'],
// createdAt: repo['created_at'],
// size: repo.size,
// forks: repo.forks,
// watchers: repo.watchers
// stars: repo.stargazers_count
