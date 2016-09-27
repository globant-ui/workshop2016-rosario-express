'use strict';

const dataBase = require('../../database/Database').instance;
const docTypes = require('../../database/docTypes');
const Promise = require('bluebird');

class CommentModel {

    getById (id) {
        return dataBase.findOne({_id: id, docType: docTypes.COMMENT});
    }

    getListFiltered (filter) {
        const query = Object.assign({}, {docType: docTypes.COMMENT}, filter || {});

        return dataBase.find(query);
    }

    addCommentToTrack (payload) {
        return new Promise ((resolve, reject) => {
            const comment = {
                docType: docTypes.COMMENT,
                message: payload.message,
                name: payload.name
            };
            const trackId = payload.trackId;
            var insertedComment;

            if (!comment.name || !comment.message) {
                return reject(new Error('Should send a valid name and message'));
            }

            dataBase.findOne({_id: trackId, docType: docTypes.TRACK})
                .then(track => {
                    if (!track) {
                        return reject(new Error('Invalid track id'));
                    }

                    return dataBase.insert(comment)
                })
                .then(newComment => {
                    insertedComment = newComment;

                    return dataBase.update({_id: trackId, docType: docTypes.TRACK}, {$inc: {commentsCount: 1}, $push: {comments: insertedComment._id}});
                })
                .then(updatedTrack => resolve(insertedComment))
                .catch(error => reject(error));
        });
    }

    deleteComment (id) {
        const commentQuery = {_id: id, docType: docTypes.COMMENT};

        return new Promise ((resolve, reject) => {
            dataBase.findOne(commentQuery)
                .then(comment => {
                    if (!comment) {
                        return reject(new Error('Invalid comment id'));
                    }

                    return dataBase.remove(commentQuery)
                })
                .then((affectedDocuments) => {
                    if (affectedDocuments) {

                    }
                    return reject(new Error('No comments were deleted'));
                })
                .catch(error => reject(error));
        });
    }

}
module.exports.CommentModel = CommentModel;
module.exports.instance = new CommentModel();