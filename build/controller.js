const fs = require("fs");
const path = require("path");

const bodyParser = require('body-parser');


module.exports = function (app) {
    app.use(bodyParser.urlencoded({
        'extended': 'true'
    }));

    app.use(bodyParser.json());

    app.use(bodyParser.json({
        type: 'application/vnd.api+json'
    }));

    // app.get('*', (req, res) => {
    //     res.sendFile(path.join(__dirname + '/../dist/index.html'));
    // });

    // Controllers
    app.get('/users', usersController);
    app.post('/users', usersController);

    app.post('/login', loginController);
    app.post('/users', usersController);
    app.post('/logout', logoutController);

    function loginController(req, res) {
        const contents = fs.readFileSync(path.join(__dirname + '/../.data/db.json'));
        const jsonContent = JSON.parse(contents);
        let status = 200;

        let logged = login(req.body.email, req.body.password, jsonContent.users);
        console.log('logged', req.body.email, req.body.password);
        let errors = null;

        if (logged) { // User is logged
            // req.session.loggedUser = logged.name;
            console.log(logged.name + ' is logged');


        } else { // User is not logged
            // req.session.destroy();
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

        req.session.destroy();

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