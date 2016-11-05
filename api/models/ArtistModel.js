'use strict';

const dataBase = require('../../database/Database').instance;
const docTypes = require('../../database/docTypes');

class ArtistModel {
    getArtists() {
      return dataBase.find({docType: docTypes.ARTIST})
    }
    getArtist(id) {
        return dataBase.findOne({docType: docTypes.ARTIST, _id:id})
    }
}
module.exports.ArtistModel = ArtistModel;
module.exports.instance = new ArtistModel;
