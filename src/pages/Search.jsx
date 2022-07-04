import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      albums: undefined,
      artist: '',
      search: '',
      check: true,
      lF: false,
      n: 0,
    };
  }

  inputChange = ({ target }) => {
    const { value } = target;
    const check = value.length < 2;
    this.setState({ search: value, check });
  }

  buttonClick = async () => {
    const { search } = this.state;
    this.setState({ lF: true, search: '' });
    const result = await searchAlbumsAPI(search);
    const n = result.length;
    this.setState({ albums: result, lF: false, artist: search, n });
  }

  renderAlbum = () => {
    const { artist, n, albums } = this.state;
    if (n > 0) {
      return (
        <>
          <h3>{`Resultado de álbuns de: ${artist}`}</h3>
          <div>
            {
              albums.map(({
                artistName,
                collectionId,
                collectionName,
                artworkUrl100,
              }) => (
                <div key={ collectionId }>
                  <div>
                    <img src={ artworkUrl100 } alt={ collectionName } />
                  </div>
                  <Link
                    to={ `/album/${collectionId}` }
                    data-testid={ `link-to-album-${collectionId}` }
                  >
                    { collectionName }
                  </Link>
                  <p>{ artistName }</p>
                </div>
              ))
            }
          </div>
        </>
      );
    }
    return <h3>Nenhum álbum foi encontrado</h3>;
  }

  renderForm = (search, check) => (
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
          onClick={ this.buttonClick }
          type="button"
          disabled={ check }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </div>
    </form>
  )

  render() {
    const { search, check, lF, albums } = this.state;
    return (
      <>
        <Header />
        {
          lF
            ? <Carregando />
            : this.renderForm(search, check)
        }
        <div>
          {
            albums && this.renderAlbum()
          }
        </div>
      </>
    );
  }
}

export default Search;
