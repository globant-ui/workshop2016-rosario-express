'use strict';

var band = require('../models/BandModel').instance;

class BandController {

    getList (req, res) {
        band.getList()
            .then(documents => res.json(documents))
            .catch(error => res.json({error: error.message}));
    }

    getById (req, res) {
        band.getById(req.params.id)
            .then(document => res.json(document || {}))
            .catch(error => res.json({error: error.message}));
    }

    getAlbums (req, res) {
        band.getBandAlbums(req.params.id)
            .then(documents => res.json(documents))
            .catch(error => res.json({error: error.message}));
    }

    getArtists (req, res) {
        band.getBandArtists(req.params.id)
            .then(documents => res.json(documents))
            .catch(error => res.json({error: error.message}));
    }
}

module.exports.BandController = BandController;
module.exports.instance = new BandController();