const router = require('express').Router();
const colors = require('colors/safe');
const trackController = require('./controllers/TrackController').instance; //Sample controller
const bandsController = require('./controllers/BandController').instance;
// Specific router middleware that shows the request timestamp
router.use((req, res, next) => {
    console.log(`${colors.green('Requesting: ')} ${req.method}  ${req.path}  -> Time: `, Date.now());
    next();
});

// API Routes
router.get('/tracks', trackController.getList); //Sample route
router.get('/tracks/:id', trackController.getById);

router.get('/bands', bandsController.getBands); //Bands route
router.get('/bands/:bandId', bandsController.getBand); //Bands route

module.exports = router;
