import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

const LIMIT_CARACTER = 3;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      check: true,
      isLoading: false,
    };
  }

  handleChanger = ({ target }) => {
    const { value } = target;
    const boo = value.length < LIMIT_CARACTER;
    this.setState({ name: value, check: boo });
  }

  click = (e) => {
    e.preventDefault();
    const { history } = this.props;
    this.setState({ isLoading: true }, async () => {
      const { name } = this.state;
      await createUser({ name });
      history.push('/search');
    });
  }

  render() {
    const { name, check, isLoading } = this.state;
    return (
      <div>
        {
          isLoading ? <Carregando /> : (
            <form>
              <div>
                <input
                  onChange={ this.handleChanger }
                  value={ name }
                  type="text"
                  data-testid="login-name-input"
                />
              </div>
              <div>
                <button
                  disabled={ check }
                  onClick={ this.click }
                  name="name"
                  type="submit"
                  data-testid="login-submit-button"
                >
                  Entrar
                </button>
              </div>
            </form>
          )
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
