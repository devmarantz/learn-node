const mongoose = require('mongoose');

const Store = mongoose.model('Store');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: 'That filetype is not allowed!' }, false);
    }
  },
};

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

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
  // check if there is no new file to resize
  if (!req.file) {
    next(); //skip to the next middleware
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  // once we've written the photo to our system now we can continue
  next();
};

exports.createStore = async (req, res) => {
  const store = await new Store(req.body).save();
  await store.save();
  req.flash('success', `Successfully created ${store.name}!  Good job dude. 🤙`);
  res.redirect(`/stores/${store.slug}`);
};

exports.getStores = async (req, res) => {
  // 1. Query the database for a list of all stores
  const stores = await Store.find();
  console.log(stores);
  res.render('stores', { title: 'Stores', stores });
};

exports.editStore = async (req, res) => {
  // 1. Find the store given the id
  const store = await Store.findOne({ _id: req.params.id });
  // res.json(store);
  // TODO: 2. Confirm they are the owner of the store
  // 3. Render out the edit form so the user can update their store
  res.render('editStore', { title: `Edit ${store.name}`, store });
};

exports.updateStore = async (req, res) => {
  // set the location data to be a point
  req.body.location.type = 'Point';
  // Find and update store
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, //return the new store instead of the old one
    runValidators: true, //Checks required fields from schema
  }).exec();
  req.flash(
    'success',
    `Successfully updated <strong>${store.name}</strong>.  <a href="/stores/${store.slug}">View store </a>`
  );
  res.redirect(`/stores/${store._id}/edit`);
  // Redirect them to store and tell them it worked
};

exports.getStoreBySlug = async (req, res) => {
  res.send('It works');
};
