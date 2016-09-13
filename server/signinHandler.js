const shortid = require('shortid');

module.exports = (req, res) => {
  var options = { 'username': req.body.username, 'error': null };
  if (!req.body.username) {
    res.status(400).send('Something broke!');
  } else if (req.session.username) {
    // User has not changed username, accept it as-is
    //res.redirect('/');
  } else {
    // Validate if username is free
    req.session.user = {
      id: shortid.generate(),
      name: req.body.username,
    };
    
    res.send(options);
  }
}
