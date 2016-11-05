'use strict';

const track = require('../models/TrackModel').instance;

class TrackController {

    getList (req, res) {
        track.getList()
            .then(documents => res.json(documents))
            .catch(error => res.json({error: error.message}));
    }
    getById (req, res) {
      track.getById(req.params.id)
        .then(tracks => res.json(tracks))
        .catch(error => res.json({error: error.message}));

    }
}
exports.TrackController = TrackController;
exports.instance = new TrackController();
