module.exports = (req, res) => {
  var options = { 'username': req.body.username, 'error': null };
  if (!req.body.username) {
    res.status(400).send('Something broke!');
  } else if (req.body.username === req.session.username) {
    // User has not changed username, accept it as-is
    res.redirect('/');
  } else {
    // Validate if username is free
    req.session.username = req.body.username;
    res.json(options);
  }
}
