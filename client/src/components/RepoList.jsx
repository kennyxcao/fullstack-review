import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    <p>There are {props.repos.length} repos.</p>
    <ol>
      {props.repos.map((repo, index) =>
        <RepoListEntry key={repo.repoID} repo={repo} />
      )}
    </ol>
  </div>
);

export default RepoList;