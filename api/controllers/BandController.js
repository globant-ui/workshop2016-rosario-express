'use strict';

const band = require('../models/BandModel').instance;

class BandController {
    getBands (req, res){
        band.getBands()
        .then(documents => res.json(documents))
        .catch(error => res.json({error: error.message}));
    }
    getBand(req, res){
      band.getBand(req.params.bandId)
              .then(documents => res.json(documents))
              .catch(error => res.json({error: error.message}));
    }
}

exports.BandController = BandController;
exports.instance = new BandController;
