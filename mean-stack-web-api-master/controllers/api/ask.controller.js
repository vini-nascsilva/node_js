var config = require('config.json');
var express = require('express');
var router = express.Router();
var askService = require('services/ask.services');

// routes

router.post('/register', registerAsk);
router.get('/:_id', getAskById);
router.get('/', getAsk);
router.delete('/:_id', deleteAsk);

module.exports = router;

function registerAsk(req, res) {
    askService.cadAsk(req.body)
        .then(function () {
            //res.sendStatus(200);
            res.send(req.body);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAskById(req, res) {
    askService.findAskById(req.params._id)
        .then(function (ask) {
            if (ask) {
                res.send(ask);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAsk(req, res) {
    askService.findAsk()
        .then(function (ask) {
            if (ask) {
                res.send(ask);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteAsk(req, res) {
    askService.delAskById(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

