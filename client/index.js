import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

const client = new ApolloClient({
  dataIdFromObject: o => o.id
});

import SongList from './components/song-list';
import SongCreate from './components/song-create';
import SongDetail from './components/song-detail';

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider>
        <Router history={hashHistory}>
          <Route path="/">
              <IndexRoute component={SongList} />
              <Route path="/songs" component={SongList} />
              <Route path="/songs/new" component={SongCreate} />
              <Route path="/songs/:id" component={SongDetail} />
          </Route>
        </Router>
      </MuiThemeProvider>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
