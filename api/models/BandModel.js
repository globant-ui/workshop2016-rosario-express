'use strict';

const dataBase = require('../../database/Database').instance;
const docTypes = require('../../database/docTypes');
const Promise = require('bluebird');

class BandModel {

    getList () {
        return this.getListFiltered();
    }

    getById (id) {
        return dataBase.findOne({_id: id, docType: docTypes.BAND});
    }

    getListFiltered (filter) {
        const query = Object.assign({}, {docType: docTypes.BAND}, filter || {});

        return dataBase.find(query);
    }

    getBandArtists (bandId) {
        return new Promise ((resolve, reject) => {
            this.getById(bandId)
                .then(band => {
                    const artistIds = band.artists;
                    return dataBase.find({_id: {$in: artistIds}, docType: docTypes.ARTIST});
                })
                .then(artists => resolve(artists))
                .catch(error => reject(error));
        });
    }

    getBandAlbums (bandId) {
        return new Promise ((resolve, reject) => {
            this.getById(bandId)
                .then(band => {
                    const albumIds = band.albums;
                    return dataBase.find({_id: {$in: albumIds}, docType: docTypes.ALBUM});
                })
                .then(albums => resolve(albums))
                .catch(error => reject(error));
        });
    }


}
module.exports.BandModel = BandModel;
module.exports.instance = new BandModel();