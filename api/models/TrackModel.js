'use strict';

const dataBase = require('../../database/Database').instance;
const docTypes = require('../../database/docTypes');

class TrackModel {

    getList () {
        return dataBase.find({docType: docTypes.TRACK});
    }
    getById (id) {
        return dataBase.findOne({docType: docTypes.TRACK, _id: id});
    }
}
module.exports.TrackModel = TrackModel;
module.exports.instance = new TrackModel();
