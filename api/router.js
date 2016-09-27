const router = require('express').Router();
const colors = require('colors/safe');
const albumController = require('./controllers/AlbumController').instance;
const artistController = require('./controllers/ArtistController').instance;
const commentController = require('./controllers/CommentController').instance;
const bandController = require('./controllers/BandController').instance;
const trackController = require('./controllers/TrackController').instance;

// Specific router middleware that shows the request timestamp
router.use((req, res, next) => {
    console.log(`${colors.green('Requesting: ')} ${req.method}  ${req.path}  -> Time: `, Date.now());
    next();
});

// API Routes
router.get('/albums', albumController.getList);
router.get('/albums/:id', albumController.getById);
router.get('/albums/:id/tracks', albumController.getTracks);
router.get('/artists', artistController.getList);
router.get('/artists/:id', artistController.getById);

router.get('/comments/:id', commentController.getById);
router.post('/comments', commentController.addComment);
router.delete('/comments/:id', commentController.deleteComment);

router.get('/bands', bandController.getList);
router.get('/bands/:id', bandController.getById);
router.get('/bands/:id/albums', bandController.getAlbums);
router.get('/bands/:id/artists', bandController.getArtists);

router.get('/tracks', trackController.getList);
router.get('/tracks/:id', trackController.getById);
router.get('/tracks/:id/comments', trackController.getComments);

module.exports = router;
