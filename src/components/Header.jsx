import React from 'react';
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

  render() {
    const { user, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        {
          isLoading
            ? <Carregando />
            : <p data-testid="header-user-name">{ `Olá ${user}` }</p>
        }
      </header>
    );
  }
}

export default Header;
