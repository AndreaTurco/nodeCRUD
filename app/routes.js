const express = require('express'),
    router = express.Router(),
    mainController = require('./controllers/main.controller'),
    eventsController = require('./controllers/events.controller');

module.exports = router;


router.get('/', mainController.showHome);

// events index
router.get('/events', eventsController.showEvents);

//seed
router.get('/events/seed', eventsController.seedEvents);

//add
router.get('/events/add', eventsController.addEvents);
router.post('/events/create', eventsController.createEvent);

//show
router.get('/events/:slug', eventsController.showSingle);

//update
router.get('/events/:slug/edit', eventsController.updateEvents);
router.post('/events/:slug/update', eventsController.editEvent);
