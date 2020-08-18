var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
    res.render('index', { title: 'Up and running' });
});

/* GET Userlist page. */
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