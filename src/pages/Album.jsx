import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      albumName: '',
      albums: [],
      check: false,
    };
  }

  componentDidMount() {
    this.criarLista();
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
    const { name, albumName, albums, check } = this.state;
    return (
      <>
        <Header />
        <div>
          <h2 data-testid="artist-name">{ name }</h2>
          <h2 data-testid="album-name">{ `${albumName} - ${name}` }</h2>
        </div>
        <div>
          { check && albums.map((e) => (
            <div key={ e.trackId }>
              <MusicCard previewUrl={ e.previewUrl } trackName={ e.trackName } />
            </div>
          ))}
        </div>
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
