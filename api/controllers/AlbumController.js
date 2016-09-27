'use strict';

var album = require('../models/AlbumModel').instance;

class AlbumController {

    getList (req, res) {
        album.getList()
            .then(documents => res.json(documents))
            .catch(error => res.json({error: error}));
    }

    getById (req, res) {
        album.getById(req.params.id)
            .then(document => res.json(document || {}))
            .catch(error => res.json({error: error.message}));
    }

    getTracks (req, res) {
        album.getAlbumTracks(req.params.id)
            .then(documents => res.json(documents))
            .catch(error => res.json({error: error.message}));
    }
}

module.exports.AlbumController = AlbumController;
module.exports.instance = new AlbumController();