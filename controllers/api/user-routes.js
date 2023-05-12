const router = require('express').Router();
const {
    User,
    Post,
    Comment
} = require('../../models');

// Get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password']
        }
    })
        .then(databaseUserData => res.json(databaseUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get specific user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {
            exclude: ['password']
        },
        where: {
            id: req.params.id
        },
        include: [{
            model: Post,
            attributes: ['id', 'title', 'content', 'created_at']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'created_at'],
            include: {
                model: Post,
                attributes: ['title']
            }
        }
        ]
    })
        .then(databaseUserData => {
            if (!databaseUserData) {
                res.status(404).json({
                    message: 'No user found with this id'
                });
                return;
            }
            res.json(databaseUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(databaseUserData => {
            req.session.save(() => {
                req.session.user_id = databaseUserData.id;
                req.session.username = databaseUserData.username;
                req.session.loggedIn = true;

                res.json(databaseUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(databaseUserData => {
            console.log(databaseUserData.username)
            if (!databaseUserData) {
                res.status(400).json({
                    message: 'No user with that username!'
                });
                return;
            }

            console.log(databaseUserData)
            req.session.save(() => {
                console.log(3)
                req.session.user_id = databaseUserData.id;
                req.session.username = databaseUserData.username;
                req.session.loggedIn = true;
                console.log(4)
                res.json({
                    user: databaseUserData,
                    message: 'You are now logged in!'
                });
            });
            console.log(1)

            const validPassword = databaseUserData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({
                    message: 'Incorrect password!'
                });
                return;
            }


            console.log(2)
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }

});

module.exports = router;