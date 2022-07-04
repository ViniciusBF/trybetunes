import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Carregando from '../components/Carregando';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      albumName: '',
      albums: [],
      check: false,
      isLoading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.criarLista();
    this.recuperarMusicas();
  }

  recuperarMusicas = async () => {
    this.setState({ isLoading: true });
    const lista = await getFavoriteSongs();
    this.setState(() => ({
      favorites: lista,
      isLoading: false,
    }));
  }

  favoritesMu = (target) => {
    const { id, checked } = target;
    const obj = { trackId: Number(id) };
    if (checked) {
      this.setState((prev) => ({
        favorites: [...prev.favorites, obj],
      }));
    } else {
      this.setState((prev) => ({
        favorites: prev.favorites.filter(({ trackId }) => trackId !== obj.trackId),
      }));
    }
  };

  clickButton = async ({ target }) => {
    this.setState({ isLoading: true });
    this.favoritesMu(target);
    const { name, id, value } = target;
    const num = Number(id);
    await addSong({ trackId: num, trackName: name, previewUrl: value, kind: 'song' });
    this.setState({ isLoading: false });
  }

  criarLista = async () => {
    const { match: { params: { id } } } = this.props;
    const lista = await getMusics(id);
    const dados = lista[0];
    const listaMusicas = lista.filter((e) => e !== dados);
    this.setState({
      check: true,
      name: dados.artistName,
      albumName: dados.collectionName,
      albums: listaMusicas,
    });
  }

  render() {
    const { favorites, isLoading, name, albumName, albums, check } = this.state;
    return (
      <>
        <Header />
        {
          isLoading
            ? <Carregando />
            : (
              <>
                <div>
                  <h2 data-testid="artist-name">{ name }</h2>
                  <h2 data-testid="album-name">{ `${albumName} - ${name}` }</h2>
                </div>
                <div>
                  { check && albums.map((e) => (
                    <div key={ e.trackId }>
                      <MusicCard
                        event={ this.clickButton }
                        track={ e }
                        boo={ favorites.some(({ trackId }) => trackId === e.trackId) }
                      />
                    </div>
                  ))}
                </div>
              </>
            )
        }
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
