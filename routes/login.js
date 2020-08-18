var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
    res.render('index');
});

router.post('/create-new', function(req, res) {
    console.log('found it')
    const newEmployee = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.email,
    }
    var db = req.db;
    var collection = db.get('employees');
    collection.insertOne(newEmployee)
        .then(result => {
            res.status(201);
            res.send('/login');
        })
        .catch(error => {
            res.status(400);
            res.render('There are errors in the values submitted');
            res.send('/login');
        });
});

router.get('/authenticate', function(req, res) {
    var db = req.db;
    var collection = db.get('employees');
    collection.find({}, {}, function(e, docs) {
        res.render('index', {
            "userlist": docs
        });
    });
});

module.exports = router;