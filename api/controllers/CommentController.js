'use strict';

var comment = require('../models/CommentModel').instance;

class CommentController {

    getById (req, res) {
        comment.getById(req.params.id)
            .then(document => res.json(document || {}))
            .catch(error => res.json({error: error.message}));
    }

    addComment (req, res) {
        const payload = {
            message: req.body.message,
            name: req.body.name,
            trackId: req.body.trackId
        };

        comment.addCommentToTrack(payload)
            .then(response => res.json(response || {}))
            .catch(error => res.json({error: error.message}));
    }

    deleteComment (req, res) {
        comment.deleteComment(req.params.id)
            .then(response => res.json(response || {}))
            .catch(error => res.json({error: error.message}));
    }
}

module.exports.CommentController = CommentController;
module.exports.instance = new CommentController();