var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', );
});
// Create new employee account
router.get('/register', function(req, res, next) {
    res.render('register');
});
router.get('/create-new', function(req, res) {
    const employee = new Cause({
        username: req.body.name,
        email: req.body.emil,
        password: req.body.password
    });
    var db = req.db;
    var collection = db.get('employees');
    collection.find({}, {}, function(e, docs) {
        res.render('index', {
            "employeesList": docs
        });
    });
});
module.exports = router;