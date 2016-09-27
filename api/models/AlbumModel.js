'use strict';

const dataBase = require('../../database/Database').instance;
const docTypes = require('../../database/docTypes');
const Promise = require('bluebird');

class AlbumModel {

    getList () {
        return this.getListFiltered();
    }

    getById (id) {
        return dataBase.findOne({_id: id, docType: docTypes.ALBUM});
    }

    getListFiltered (filter) {
        const query = Object.assign({}, {docType: docTypes.ALBUM}, filter || {});

        return dataBase.find(query)
    }

    getAlbumTracks (albumId) {
        return new Promise ((resolve, reject) => {
            this.getById(albumId)
                .then(band => {
                    const trackIds = band.tracks;

                    return dataBase.find({_id: {$in: trackIds}, docType: docTypes.TRACK});
                })
                .then(artists => resolve(artists))
                .catch(error => reject(error));
        });
    }

}
module.exports.AlbumModel = AlbumModel;
module.exports.instance = new AlbumModel();