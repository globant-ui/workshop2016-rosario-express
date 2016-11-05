'use strict';

const dataBase = require('../../database/Database').instance;
const docTypes = require('../../database/docTypes');

class DocumentModel {
    getDocuments(id) {
        return dataBase.findOne({docType: docTypes.COMMENT, _id:id})
    }
}
module.exports.DocumentModel = DocumentModel;
module.exports.instance = new DocumentModel;
