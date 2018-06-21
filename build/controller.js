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

  app.post('/login', loginController);
  app.post('/users', usersController);
  app.post('/logout', logoutController);
  app.post('/saveTask', saveTaskController);
  app.post('/getTasks', getTasks);
  app.post('/deleteTask', deleteTaskController);

  function setSessionUser(session, name) {
    session.loggedUser = name;
    // console.log(name + ' is logged');
  }

  function endSession(session) {
    if (session) {
      session.destroy();
    } else {
      console.log('no session');
    }
  }

  function getTasks(req, res) {
    let user = null;
    user = req.session.loggedUser;
    const contents = fs.readFileSync(path.join(__dirname + '/../.data/db.json'));
    const jsonContent = JSON.parse(contents);
    let status = 200;

    var fileName = path.join(__dirname + '/../.data/data.tasks.json');
    var file = require(fileName);
    console.log('getTasks');
    res.json(file);
  }

  function deleteTaskController(req, res) {
    let status = 500;
    let message = 'Something went wrong...';

    const name = req.body.name;
    let fileName = path.join(__dirname + '/../.data/data.tasks.json');
    let file = require(fileName);

    let item = file.find(function (el) {
      return el.name == name;
    });

    if(item){
      const index = file.indexOf(item);
      file.splice(index,1);
      console.log('deleteTaskController index', index);

      fs.writeFile(fileName, JSON.stringify(file, null, 2), function (error) {
        if (error) {
          console.error(error);
          status = 500;
          message = error;
        }
      });
      status = 200;
      message = `Item deleted ${name}`;
    }else{
      status = 500;
      message = `No item with name ${name}`;
      console.log(message);
    }

    return res.status(200).send(message);
  }

  function saveTaskController(req, res) {
    let user = null;
    user = req.session.loggedUser;

    let status = 200;

    let fileName = path.join(__dirname + '/../.data/data.tasks.json');
    let file = require(fileName);

    const item = req.body;
    const name = item.name;

    if (item) {
      let alreadyExist = false;

      file.map((u, i) => {
        if ((u.name == name)) {
          alreadyExist = u;
        }
      });

      if (alreadyExist) {
        const index = file.indexOf(alreadyExist);
        if(index !== -1){
          file[index] = item
        }else{
          console.warn('Error: cant find already existing item')
        }


      } else {
        file[file.length] = item;

        console.warn('new item')
        console.warn(file[file.length])
      }

      console.warn(item)


      fs.writeFile(fileName, JSON.stringify(file, null, 2), function (error) {
        if (error) {
          console.log(error);
          return res.status(500).send(error);
        }
      });
      return res.status(200).send(item);
    }

    return res.status(200).send(`Item is not updated. Item: ${item}`);
  }

  function loginController(req, res) {
    const contents = fs.readFileSync(path.join(__dirname + '/../.data/db.json'));
    const jsonContent = JSON.parse(contents);
    let status = 200;

    let logged = login(req.body.email, req.body.password, jsonContent.users);
    // console.log('logged', req.body.email, req.body.password);
    let errors = null;

    if (logged) { // User is logged
      setSessionUser(req.session, logged.name);


    } else { // User is not logged
      endSession(req.session);

      errors = 'No such User or Pass is invalid';
      status = 304;
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
      // console.log(user + ' is logged out');
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