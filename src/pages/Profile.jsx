import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      user: {},
    };
  }

  componentDidMount() {
    this.dadosUser();
  }

  dadosUser = async () => {
    const obj = await getUser();
    this.setState({ isLoading: false, user: obj });
  }

  render() {
    const { isLoading, user } = this.state;
    return (
      <>
        <Header />
        {
          isLoading
            ? <Carregando />
            : (
              <div>
                <img
                  data-testid="profile-image"
                  src={ user.image }
                  alt={ `foto do perfil de ${user.name}` }
                />
                <h4>Nome</h4>
                <p>{ user.name }</p>
                <h4>E-mail</h4>
                <p>{ user.email }</p>
                <h4>Descrição</h4>
                <p>{ user.description }</p>
                <div>
                  <Link to="/profile/edit">Editar perfil</Link>
                </div>
              </div>
            )
        }
      </>
    );
  }
}

export default Profile;
