const path = require('path');

module.exports = function (app) {

// Controllers
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/../dist/index.html'));
    });
    app.post('/login', loginController);
    app.post('/logout', logoutController);

    function loginController(req, res) {

        res.status(200).send({
            user: logged,
            authorized: logged ? true : logged,
            session: req.session || null,
            errors: errors
        })
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

    function findRole(user) {
        for (let usr in users) {
            if ((users[usr].user === user)) {
                return users[usr].role;
            }
        }
        console.log('cant find ' + user + ' users role');
        return null;
    }

    function isLogged(session) {
        return (session && session.loggedUser && session.loggedUser != null);
    }
};