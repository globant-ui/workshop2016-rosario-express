'use strict';

const dataBase = require('../../database/Database').instance;
<<<<<<< HEAD
const docTypes = require('../../database/docTypes')

class BandModel {
    getBands() {
      return dataBase.find({docType: docTypes.BAND})
    }
    getBand(id) {
        return dataBase.findOne({docType: docTypes.BAND, _id:id})
    }
}
module.exports.BandModel = BandModel;
module.exports.instance = new BandModel;
