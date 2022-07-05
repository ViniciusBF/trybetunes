import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import '../styles/Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getName();
  }

  getName = async () => {
    const value = await getUser();
    const { name } = value;
    this.setState({ user: name, isLoading: false });
  }

  renderHeader = (user) => (
    <div className="container-header">
      <div className="header">
        <h1>
          Olá
          <span data-testid="header-user-name">{` ${user}`}</span>
        </h1>
      </div>
      <nav className="nav">
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </nav>
    </div>
  )

  render() {
    const { user, isLoading } = this.state;
    return (
      <header className="header" data-testid="header-component">
        {
          isLoading
            ? <Carregando />
            : this.renderHeader(user)
        }
      </header>
    );
  }
}

export default Header;
