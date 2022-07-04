import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (
              <div data-testid="page-login">
                <Login { ...props } func={ this.updtObject } />
              </div>
            ) }
          />
          <Route
            path="/search"
            render={ () => (
              <div data-testid="page-search">
                <Search />
              </div>
            ) }
          />
          <Route
            path="/album/:id"
            render={ (props) => (
              <div data-testid="page-album">
                <Album { ...props } />
              </div>
            ) }
          />
          <Route
            path="/favorites"
            render={ () => (
              <div data-testid="page-favorites">
                <Favorites />
              </div>
            ) }
          />
          <Route
            path="/profile/edit"
            render={ () => (
              <div data-testid="page-profile-edit">
                <ProfileEdit />
              </div>
            ) }
          />
          <Route
            path="/profile"
            render={ () => (
              <div data-testid="page-profile">
                <Profile />
              </div>
            ) }
          />
          <Route
            path="*"
            render={ () => (
              <div data-testid="page-not-found">
                <NotFound />
              </div>
            ) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
