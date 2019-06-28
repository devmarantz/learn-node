const mongoose = require('mongoose');

const Store = mongoose.model('Store');

exports.myMiddleware = (req, res, next) => {
  req.name = 'Devon';
  res.cookie('name', 'Devon likes food', { maxAge: 90000000 });
  // if (req.name === 'Devon') {
  //   throw Error('That is a stupid name!');
  // }
  next();
};

exports.homePage = (req, res) => {
  console.log(req.name);
  req.flash('error', `Suc Good job dude. 🤙`);
  req.flash('error', `🍵`);
  req.flash('warning', `🙏`);
  req.flash('info', `Suc Good job dude. 🤙`);
  req.flash('error', `🍊🏄‍♂️`);
  req.flash('success', `Suc Good job dude. 🤙`);

  res.render('index');
  // console.log('Yooooo');
  // const devon = { name: 'devon', hair: 'black', fresh: true };
  // res.send(devon);
  // res.json(req.query);
  // res.render('hello', {
  //   name: 'Devon',
  //   dog: req.query.dog,
  //   title: `I'm hungry`,
  // });
};

exports.addStore = (req, res) => {
  res.render('editStore', { title: '🤙Add Store' });
};

exports.createStore = async (req, res) => {
  const store = new Store(req.body);
  await store.save();
  req.flash('success', `Successfully create ${store.name}!  Good job dude. 🤙`);
  res.redirect('/');
};
