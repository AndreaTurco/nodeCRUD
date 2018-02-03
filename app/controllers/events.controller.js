const Event = require('../models/event');

module.exports = {
    showEvents: showEvents,
    showSingle: showSingle,
    seedEvents: seedEvents,

    addEvents: addEvents,
    createEvent: createEvent,

    updateEvents: updateEvents,
    editEvent: editEvent
};


function showEvents(req, res) {
    Event.find({}, (err, events) => {
        if (!events) {
            res.status(404).json({
                message: 'no events'
            });
        }
        res.render('pages/events', {
            events: events
        });
    });
}

function addEvents(req, res) {
    res.render('pages/event_add');
}

function createEvent(req, res) {
    var dataReq = {
        name: req.body.name,
        description: req.body.description
    };
    var newEvent = new Event(dataReq);
    newEvent.save(function (err) {
        if (err) throw err;

        //to add flash nessage
        res.redirect('pages/single', {
            event: newEvent,
            messages: 'new event saved'
        });
    });

}

function updateEvents(req, res) {
    Event.findOne({
        slug: req.params.slug
    }, (err, event) => {
        if (!event) {
            res.status(404).json({
                message: 'no event'
            });
        }
        res.render('pages/event_update', {
            event: event
        });

    });
}

function editEvent(req, res) {
    var dataReq = {
        name: req.body.name,
        description: req.body.description
    };
    Event.findOneAndUpdate({
        slug: req.params.slug
    }, dataReq, {new: true}, function (err, updatedEvent) {
        if (err) throw err;
        //to add flash nessage
        res.render('pages/single', {
            event: updatedEvent,
            messages: 'event updated'
        });
    });
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function showSingle(req, res) {
    Event.findOne({
        slug: req.params.slug
    }, (err, event) => {
        if (!event) {
            res.status(404).json({
                message: 'no event'
            });
        }
        res.render('pages/single', {
            event: event
        });

    });

}


//seeding
function seedEvents(req, res) {
    //create event
    const events = [{
            name: 'Basketball',
            description: 'Throwing into a basket.'
        },
        {
            name: 'Swimming',
            description: 'Michael Phelps is the fast fish.'
        },
        {
            name: 'Weightlifting',
            description: 'Lifting heavy things up'
        },
        {
            name: 'asdasdasda',
            description: 'asdasdasd heavy things up'
        }
    ];
    //reset first
    //use model for save data
    Event.remove({}, () => {
        for (event of events) {
            var newEvent = new Event(event);
            newEvent.save();
        }
    });
    //response
    res.send('seeded');
}