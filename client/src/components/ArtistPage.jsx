import React, { useEffect, useState } from 'react';
// import AlbumCard from './components/AlbumCard';
import AlbumCard from './AlbumCard';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';

//Fetch the artist data
//map

const ArtistPage = () => {
  const [artist, setArtist] = useState([]);
  const [artistPicName, setArtistPicName] = useState({});
  const [sortDirection, setSortDirection] = useState('asc');
  let { artistParam } = useParams();

  useEffect(() => {
    const fetchDataMainArtist = async () => {
      try {
        let response = await axios.get(
          `https://theaudiodb.com/api/v1/json/1/search.php?s=${artistParam}`
        );
        setArtistPicName(response.data.artists[0]);
      } catch (e) {
        console.log(e, 'artist not found');
      }
    };

    const fetchData = async () => {
      try {
        let response = await axios.get(
          `https://www.theaudiodb.com/api/v1/json/1/searchalbum.php?s=${artistParam}`
        );
        setArtist(response.data.album);
      } catch (e) {
        console.log(e, 'artist not found');
      }
    };

    fetchDataMainArtist();
    fetchData();
  }, [artistParam]);

  const sortAscending = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    // we clone the state array
    // so we don't mutate it accidentally
    // with sort
    const array = [...artist].sort((a, b) => {
      return newDirection === 'asc'
        ? Number(a.intYearReleased) - Number(b.intYearReleased)
        : Number(b.intYearReleased) - Number(a.intYearReleased);
    });

    setSortDirection(newDirection);

    setArtist(array);
  };

  return (
    <div style={{ backgroundColor: 'grey' }}>
      <NavBar />
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '6rem'
          }}
        >
          <img
            style={{ width: '400px', height: '400px', borderRadius: '50%' }}
            src={artistPicName.strArtistThumb}
            alt="band"
          />
          <h1 id="albumtext" style={{ color: 'white', margin: '6rem' }}>
            {artistPicName.strArtist}
          </h1>
        </div>
        <div style={{ margin: '100px 5% -20px 5%' }}>
          <button
            id="albumtext"
            style={{
              color: 'white',
              backgroundColor: 'black',
              borderRadius: '15px'
            }}
            onClick={sortAscending}
          >
            Sort: {sortDirection}
          </button>
        </div>
        <div
          style={{
            margin: '3rem',
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap'
          }}
        >
          {artist &&
            artist.map((album) => {
              return (
                <AlbumCard
                  key={album.idAlbum}
                  id={album.idAlbum}
                  image={album.strAlbumThumb}
                  backImage={album.strAlbumCDart}
                  name={album.strArtist}
                  albumTitle={album.strAlbum}
                  genre={album.strGenre}
                  year={album.intYearReleased}
                  label={album.strLabel}
                  description={album.strDescriptionEN}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
