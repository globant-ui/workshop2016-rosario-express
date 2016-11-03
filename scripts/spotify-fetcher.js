'use strict';
const colors = require('colors/safe');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require("fs"));
const toSnakeCase = require('to-snake-case');
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi();

console.log(colors.green('Fetching spotify data'));
const artists = [
    '0L8ExT028jH3ddEcZwqJJ5', // Red hot chili peppers
    '40Yq4vzPs9VNUrIBG5Jr2i' // The smashing pumpkins
];
// Bands
spotifyApi.getArtists(artists)
    .then(function(data) {
        console.log(colors.green('----> Fetched BAND data'));

        if (data.body) {
            const artistsArray = data.body.artists;
            console.log('...........................');
            //Writing bands file
            artistsArray.forEach(artist => {
                const artistName = artist.name;
                const fileName = `database/seeds/bands/${toSnakeCase(artistName)}_band.json`;

                fs.writeFileAsync(fileName, JSON.stringify({
                    docType: "BAND",
                    genres: artist.genres.join(', '),
                    name: artistName,
                    url: artist.images[0].url,
                    popularity: artist.popularity
                }), "utf8");

                // Albums
                spotifyApi.getArtistAlbums(artist.id)
                    .then(data => {
                        console.log(colors.green('----> Reading Artists albums data'));
                        if (data.body) {
                            const albumsArray = [];

                            data.body.items.forEach(album => {
                                if (album.album_type === 'album') {
                                    albumsArray.push(album.id);
                                }
                            });
                            console.log('...........................', albumsArray);
                            spotifyApi.getAlbums(albumsArray)
                                .then(data => {
                                    console.log(colors.green('----> Fetched ALBUM data'));
                                    if (data.body) {
                                        const albumsData = data.body.albums;
                                        let albumsDataBaseArray = [];

                                        albumsData.forEach((album, albumKey) => {
                                            albumsDataBaseArray.push({
                                                docType : 'ALBUM',
                                                name: album.name,
                                                url: album.images[0].url,
                                                releaseDate: album.release_date
                                            });

                                            console.log(colors.green('----> Dealing with TRACKS data'));
                                            //Writing tracks
                                            const tracks = album.tracks.items.map((track) => {
                                                return {
                                                    disc_number: track.disc_number,
                                                    name: track.name,
                                                    duration_ms: track.disc_number,
                                                    track_number: track.track_number,
                                                    docType: 'TRACK'
                                                };
                                            });

                                            const tracksFileName = `database/seeds/tracks/${toSnakeCase(artistName)}_album_${albumKey}_tracks.json`;
                                            fs.writeFileAsync(tracksFileName, JSON.stringify(tracks), "utf8");
                                        });

                                        const fileName = `database/seeds/albums/${toSnakeCase(artistName)}_albums.json`;

                                        //Writing albums file
                                        fs.writeFileAsync(fileName, JSON.stringify(albumsDataBaseArray), "utf8");
                                    }
                                })
                        }
                    }, err => {
                        console.log(colors.red('Error while fetching data'));
                        console.error(err);
                    });

            });
        }
    }, err => {
        console.log(colors.red('Error while fetching data'));
        console.error(err);
    });