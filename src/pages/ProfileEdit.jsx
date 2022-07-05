import React from 'react';
import PropTypes from 'prop-types';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      user: {},
      isDisabled: true,
    };
  }

  componentDidMount() {
    this.iniciar();
  }

  iniciar = async () => {
    await this.recuperarDados();
    this.validar();
  }

  atualizarDados = ({ target }) => {
    const { name, value } = target;
    this.setState((prev) => {
      const obj = prev.user;
      obj[name] = value;
      return { user: obj };
    }, this.validar);
  }

  recuperarDados = async () => {
    const obj = await getUser();
    this.setState({ isLoading: false, user: obj });
  }

  validar = () => {
    this.setState((prev) => {
      const { description, name, image, email } = prev.user;
      const check1 = email.search('@') > 0;
      const check2 = email.search('.com') > 0;
      const check3 = email.search(' ') < 0;
      const check4 = [description, name, image, email].every((e) => (
        e !== ''
      ));
      return { isDisabled: ![check1, check2, check3, check4].every((e) => e) };
    });
  }

  atualizarUser = (e) => {
    e.preventDefault();
    const { history } = this.props;
    this.setState({ isLoading: true }, async () => {
      const { user } = this.state;
      await updateUser(user);
      history.push('/profile');
    });
  }

  render() {
    const { isLoading, user, isDisabled } = this.state;
    return (
      <>
        <Header />
        {
          isLoading
            ? <Carregando />
            : (
              <form>
                <div>
                  <img src={ user.image } alt="foto" />
                  <label htmlFor="image">
                    Imagem
                    <input
                      data-testid="edit-input-image"
                      name="image"
                      value={ user.image }
                      onChange={ this.atualizarDados }
                      id="image"
                      type="text"
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="nome">
                    Nome
                    <input
                      data-testid="edit-input-name"
                      onChange={ this.atualizarDados }
                      value={ user.name }
                      id="nome"
                      name="name"
                      type="text"
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="email">
                    E-mail
                    <input
                      data-testid="edit-input-email"
                      onChange={ this.atualizarDados }
                      value={ user.email }
                      id="email"
                      name="email"
                      type="email"
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="description">
                    Descrição
                    <input
                      data-testid="edit-input-description"
                      onChange={ this.atualizarDados }
                      value={ user.description }
                      id="description"
                      name="description"
                      type="text"
                    />
                  </label>
                </div>
                <div>
                  <input
                    data-testid="edit-button-save"
                    type="submit"
                    onClick={ this.atualizarUser }
                    disabled={ isDisabled }
                    value="Salvar"
                  />
                </div>
              </form>
            )
        }
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
