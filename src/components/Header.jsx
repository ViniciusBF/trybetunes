import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

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
    <>
      <p>
        Olá
        <span data-testid="header-user-name">{` ${user}`}</span>
      </p>
      <nav>
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </nav>
    </>
  )

  render() {
    const { user, isLoading } = this.state;
    return (
      <header data-testid="header-component">
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
