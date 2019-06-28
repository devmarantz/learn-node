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
  const store = await new Store(req.body).save();
  await store.save();
  req.flash('success', `Successfully created ${store.name}!  Good job dude. 🤙`);
  res.redirect(`/stores/${store.slug}`);
};

exports.getStores = (req, res) => {
  // 1. Query the database for a list of all stores
  res.render('stores', { title: 'Stores' });
};
