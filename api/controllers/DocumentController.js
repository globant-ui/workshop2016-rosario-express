'use strict';

const documents = require('../models/DocumentModel').instance;

class DocumentController {
    getDocuments(req, res){
      documents.getDocuments(req.params.trackId)
              .then(documents => res.json(documents))
              .catch(error => res.json({error: error.message}));
    }
}

exports.DocumentController = DocumentController;
exports.instance = new DocumentController;
