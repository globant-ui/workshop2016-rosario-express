'use strict';
const colors = require('colors/safe');
const dataBase = require('../database/Database').instance;
const Promise = require('bluebird');
const seedData = [
    {
        band: require('../database/seeds/beatles_band'),
        artists: require('../database/seeds/beatles_artists'),
        albums: require('../database/seeds/beatles_albums'),
        tracks: [
            require('../database/seeds/beatles_album_1_tracks'),
            require('../database/seeds/beatles_album_2_tracks'),
            require('../database/seeds/beatles_album_3_tracks'),
            require('../database/seeds/beatles_album_4_tracks'),
            require('../database/seeds/beatles_album_5_tracks'),
            require('../database/seeds/beatles_album_6_tracks')
        ]
    },
    {
        band: require('../database/seeds/metallica_band'),
        artists: require('../database/seeds/metallica_artists'),
        albums: require('../database/seeds/metallica_albums'),
        tracks: [
            require('../database/seeds/metallica_album_1_tracks'),
            require('../database/seeds/metallica_album_2_tracks'),
            require('../database/seeds/metallica_album_3_tracks'),
            require('../database/seeds/metallica_album_4_tracks'),
            require('../database/seeds/metallica_album_5_tracks')
        ]
    }
];

//The DB engine adds a unique hash as id for each insertion
seedData.map(entry => {
    let band = Object.assign({}, entry.band);

    //Insert tracks by album

    const insertTracksPromises = entry.tracks.map(tracksByAlbum => {
        const tracksWithComments = tracksByAlbum.map(track => {
            return Object.assign({}, track, {comments: [], commentsCount: 0});
        });
        return dataBase.insert(tracksWithComments);
    });

    Promise.map(insertTracksPromises, (tracksByAlbum, index) => {
        //Insert albums
        const trackIds = tracksByAlbum.map(track => track._id);
        const album = Object.assign({}, entry.albums[index], {tracks: trackIds});

        return dataBase.insert(album);
    })
        .then(insertedAlbums => {
            band.albums = insertedAlbums.map(album => album._id);

            //Insert artists
            return dataBase.insert(entry.artists);
        })
        .then(insertedArtists => {
            band.artists =  insertedArtists.map(artist => artist._id);

            //Insert band
            return dataBase.insert(band);
        })
        .then(insertedBand => {
            console.log(colors.green(`Band "${insertedBand.name}" added to database`));
        })
        .catch(error => {
            console.log(colors.red('Can\'t fill the database with new data. Printing error.'));
            console.log(error);
        });
});