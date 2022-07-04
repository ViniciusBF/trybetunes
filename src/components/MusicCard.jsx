import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { boo, event, track: { previewUrl, trackName, trackId } } = this.props;
    const code = <code>audio</code>;
    return (
      <>
        <p>{ trackName }</p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          { `O seu navegador não suporta o elemento ${code}.` }
        </audio>
        <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ trackId }>
          Favorita
          <input
            onChange={ (e) => { event(e); } }
            name={ trackName }
            value={ previewUrl }
            checked={ boo }
            id={ trackId }
            type="checkbox"
          />
        </label>
      </>
    );
  }
}

MusicCard.propTypes = {
  boo: PropTypes.bool.isRequired,
  event: PropTypes.func.isRequired,
  track: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
