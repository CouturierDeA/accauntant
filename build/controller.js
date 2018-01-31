const bodyParser = require('body-parser');
const fs = require("fs");
const path = require("path");
const session = require('express-session');

// process.env.PORT

module.exports = function (app) {

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: 'MY_SECRET'
    }));


    app.use(bodyParser.urlencoded({
        'extended': 'true'
    }));

    app.use(bodyParser.json());

    app.use(bodyParser.json({
        type: 'application/vnd.api+json'
    }));

    // Controllers
    if (process.env.NODE_ENV === 'demo') {
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname + '/../dist/index.html'));
        });
    }

    app.get('/users', usersController);
    app.post('/users', usersController);

    app.post('/login', loginController);
    app.post('/users', usersController);
    app.post('/logout', logoutController);

    function setSessionUser(session, name) {
        session.loggedUser = name;
        console.log(name + ' is logged');
    }

    function endSession(session) {
        if (session) {
            session.destroy();
        } else {
            console.log('no session');
        }
    }

    function loginController(req, res) {
        const contents = fs.readFileSync(path.join(__dirname + '/../.data/db.json'));
        const jsonContent = JSON.parse(contents);
        let status = 200;

        let logged = login(req.body.email, req.body.password, jsonContent.users);
        console.log('logged', req.body.email, req.body.password);
        let errors = null;

        if (logged) { // User is logged
            setSessionUser(req.session, logged.name);


        } else { // User is not logged
            endSession(req.session);

            errors = 'No such User or Pass is invalid';
            console.log(errors);
            status = 401;
        }

        res.status(status).send(logged);
    }

    function usersController(req, res) {
        const contents = fs.readFileSync(path.join(__dirname + '/../.data/db.json'));
        const jsonContent = JSON.parse(contents);
        res.json(jsonContent);
    }

    function logoutController(req, res) {
        let user = null;

        if (isLogged(req.session)) {
            user = req.session.loggedUser;
            console.log(user + ' is logged out');
        }
        endSession(req.session);

        res.status(200).send({
            user: null,
            authorized: false,
            session: req.session || null,
            message: user + ' is logged out',
            errors: null
        })
    }

    /* AUXILIARY METHODS */

    function login(user, pass, usrs) {
        let logged = null;
        usrs.map((u, i) => {
            if ((u.email == user) && (u.password == pass)) {
                logged = {email: u.email, name: u.name};
            }
        });
        return logged;
    }

    function isLogged(session) {
        return (session && session.loggedUser && session.loggedUser != null);
    }
};