import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      check: true,
    };
  }

  inputChange = ({ target }) => {
    const { value } = target;
    const check = value.length < 2;
    this.setState({ search: value, check });
  }

  render() {
    const { search, check } = this.state;
    return (
      <>
        <Header />
        <form>
          <div>
            <input
              data-testid="search-artist-input"
              onChange={ this.inputChange }
              value={ search }
              type="text"
            />
          </div>
          <div>
            <button
              type="button"
              disabled={ check }
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default Search;
