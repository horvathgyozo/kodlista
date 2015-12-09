var express = require('express');
var router = express.Router();

var Datastore = require('nedb'),
    db = new Datastore({ filename: 'snippets.nedb', autoload: true });

router
    .get('/', function(req, res, next) {
        db.find({}, function (err, docs) {
			res.json(docs);
		});
    })
    .post('/', function(req, res) {
		console.log(req.body);
        var doc = req.body;
		db.insert(doc, function (err, newDoc) {
			res.json(newDoc);
		});
    })
    .put('/:id', function (req, res) {
        var id = req.params.id;
        var sn = req.body;
        db.update({_id: id}, sn, {}, function (err, num, newDoc) {
            res.json(newDoc);
        });
    })
    .patch('/:id', function (req, res) {
        var id = req.params.id;
        var sn = req.body;
        db.update({_id: id}, {$set: sn}, {}, function (err, num, newDoc) {
            res.json(newDoc);
        });
    })
    .delete('/:id', function (req, res) {
        var id = req.params.id;
        db.remove({_id: id}, {}, function (err, num) {
            res.status(204).send('');
        });
    });

module.exports = router;