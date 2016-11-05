const router = require('express').Router();
const colors = require('colors/safe');
const trackController = require('./controllers/TrackController').instance; //Sample controller
const bandsController = require('./controllers/BandController').instance;
const artistsController = require('./controllers/ArtistController').instance;
// Specific router middleware that shows the request timestamp
router.use((req, res, next) => {
    console.log(`${colors.green('Requesting: ')} ${req.method}  ${req.path}  -> Time: `, Date.now());
    next();
});

// API Routes
router.get('/tracks', trackController.getList); //Sample route
router.get('/bands', bandsController.getBands); //Bands route
router.get('/bands/:bandId', bandsController.getBand); //Bands route
router.get('/bands/:bandId/artists', artistsController.getArtists); //Artists route

module.exports = router;
