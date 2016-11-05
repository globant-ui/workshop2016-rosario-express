'use strict';

const artists = require('../models/ArtistModel').instance;

class ArtistController {
    getArtists(req, res){
      artists.getArtists(req.params.bandId)
              .then(documents => res.json(documents))
              .catch(error => res.json({error: error.message}));
    }
}

exports.ArtistController = ArtistController;
exports.instance = new ArtistController;
