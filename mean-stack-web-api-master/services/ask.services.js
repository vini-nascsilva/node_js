var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');

const user_service = require('./user.service.js');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('ask');

var service = {};

service.cadAsk = cadAsk;
service.findAsk = findAsk;
service.findAskById = findAskById;
service.delAskById = _delete;

module.exports = service;


function cadAsk(question) {
    var deferred = Q.defer();
    /*var user = user_service.getById(_id);

    if (!user) deferred.reject({error: 'Usuário não encontrado!'});
    
     question.user_id = user._id;*/


    db.ask.insert(
        question,
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve(question);
        });
  
           
    return deferred.promise;
}

function findAskById(_id) {
    var deferred = Q.defer();

    db.ask.findById(_id, function (err, ask) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (ask) {
             deferred.resolve(ask);
        }
        else {
            // ask not found
            deferred.resolve();
        }
    
    });

    return deferred.promise;   
}

function findAsk() {
    var deferred = Q.defer();

    db.ask.find().toArray(function (err, ask) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (ask) {
             deferred.resolve(ask);
        };
    
    });

    return deferred.promise;   
}

function _delete(_id) {
    var deferred = Q.defer();

    db.ask.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}