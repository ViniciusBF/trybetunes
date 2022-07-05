import React from 'react';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      favorites: [],
    };
  }

  componentDidMount() {
    this.carregarLista();
  }

  carregarLista = async () => {
    const lista = await getFavoriteSongs();
    this.setState({ isLoading: false, favorites: lista });
  }

  removerFav = async ({ target }) => {
    this.setState({ isLoading: true });
    const { name, id, value } = target;
    const num = Number(id);
    const obj = { trackId: num, trackName: name, previewUrl: value, kind: 'song' };
    await removeSong(obj);
    this.carregarLista();
  }

  render() {
    const { isLoading, favorites } = this.state;
    return (
      <>
        <Header />
        {
          isLoading
            ? <Carregando />
            : (
              favorites.map((e) => (
                <div key={ e.trackId }>
                  <MusicCard
                    event={ this.removerFav }
                    track={ e }
                    boo="true"
                  />
                </div>
              ))
            )
        }
      </>
    );
  }
}

export default Favorites;
