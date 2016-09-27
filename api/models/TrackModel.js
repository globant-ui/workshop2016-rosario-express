'use strict';

const dataBase = require('../../database/Database').instance;
const docTypes = require('../../database/docTypes');

class TrackModel {

    getList () {
        return this.getListFiltered();
    }

    getById (id) {
        return dataBase.findOne({_id: id, docType: docTypes.TRACK});
    }

    getTrackComments (trackId) {
        return new Promise ((resolve, reject) => {
            this.getById(trackId)
                .then(track => {
                    const commentIds = track.comments;
                    return dataBase.find({_id: {$in: commentIds}, docType: docTypes.COMMENT});
                })
                .then(comments => resolve(comments))
                .catch(error => reject(error));
        });
    }

    getListFiltered (filter) {
        const query = Object.assign({}, {docType: docTypes.TRACK}, filter || {});

        return dataBase.find(query);
    }

}
module.exports.TrackModel = TrackModel;
module.exports.instance = new TrackModel();