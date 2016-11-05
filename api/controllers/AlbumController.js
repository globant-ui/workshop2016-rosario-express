'use strict';

const album = require('../models/AlbumModel').instance;

class AlbumController {
    getAlbum(req, res){
      album.getAlbum(req.params.bandId)
          .then(documents => res.json(documents))
          .catch(error => res.json({error: error.message}));
    }
}

exports.AlbumController = AlbumController;
exports.instance = new AlbumController;
