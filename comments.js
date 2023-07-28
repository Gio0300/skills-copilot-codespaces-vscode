// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comments = require('./models/comments.js');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments');

// Create API group routes
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
});

router.route('/comments')
    .get(function(req, res) {
        Comments.find(function(err, comments) {
            if (err) {
                res.send(err);
            }
            res.json(comments);
        });
    })
    .post(function(req, res) {
        var comment = new Comments();
        comment.author = req.body.author;
        comment.text = req.body.text;
        comment.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Comment successfully added!' });
        });
    });

router.route('/comments/:comment_id')
    .put(function(req, res) {
        Comments.findById(req.params.comment_id, function(err, comment) {
            if (err) {
                res.send(err);
            }
            (req.body.author) ? comment.author = req.body.author : null;
            (req.body.text) ? comment.text = req.body.text : null;
            comment.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Comment has been updated' });
            });
        });
    })
    .delete(function(req, res) {
        Comments.remove({ _id: req.params.comment_id }, function(err, comment) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Comment has been deleted' });
        });
    });

app.use('/api', router);

app.listen(3001, function() {
    console.log('api running on port 3001');
});
