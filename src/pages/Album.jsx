import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Carregando from '../components/Carregando';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

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

  favoritesMu = async (obj, checked) => {
    this.setState({ isLoading: true });
    if (checked) {
      await addSong(obj);
    } else {
      await removeSong(obj);
    }
    await this.recuperarMusicas();
    this.setState({ isLoading: false });
  };

  clickButton = ({ target }) => {
    this.setState({ isLoading: true });
    const { name, id, value, checked } = target;
    const num = Number(id);
    const obj = { trackId: num, trackName: name, previewUrl: value, kind: 'song' };
    this.favoritesMu(obj, checked);
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
