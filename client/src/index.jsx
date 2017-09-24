import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import RepoListEntry from './components/RepoListEntry.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    };
    this.search = this.search.bind(this);
    this.fetch = this.fetch.bind(this);
  }
  
  componentDidMount() {
    this.fetch(); 
  }
  
  fetch () {
    $.ajax({
      url: `http://localhost:${process.env.PORT || 1128}/repos`,
      type: 'GET',
      dataType: 'json',
      success: (topRepos) => {
        console.log('GET /repos success');
        this.setState({
          repos: topRepos
        });
      },
      error: (error) => {
        console.error('GET /repos failed', error);
      }
    }); 
  }
  
  search (term) {
    $.ajax({
      url: `http://localhost:${process.env.PORT || 1128}/repos`,    
      type: 'POST',
      data: JSON.stringify({term}),
      contentType: 'application/json',
      success: (data) => {
        console.log('POST to /repos success');
        this.fetch();
      },
      error: (error) => {
        console.error('POST to /repos failed', error);
      }
    }); 
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));