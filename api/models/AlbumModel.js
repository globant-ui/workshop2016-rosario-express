'use strict';

const dataBase = require('../../database/Database').instance;
const docTypes = require('../../database/docTypes');

class AlbumModel {
    getAlbum (id) {
        return dataBase.findOne({docType: docTypes.ALBUM, _id:id})
    }
}
module.exports.AlbumModel = AlbumModel;
module.exports.instance = new AlbumModel();
