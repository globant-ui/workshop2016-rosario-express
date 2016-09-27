'use strict';

const dataBase = require('../../database/Database').instance;
const docTypes = require('../../database/docTypes');

class ArtistModel {

    getList () {
        return this.getListFiltered();
    }

    getById (id) {
        return dataBase.findOne({_id: id, docType: docTypes.ARTIST});
    }

    getListFiltered (filter) {
        const query = Object.assign({}, {docType: docTypes.ARTIST}, filter || {});

        return dataBase.find(query);
    }

}
module.exports.ArtistModel = ArtistModel;
module.exports.instance = new ArtistModel();