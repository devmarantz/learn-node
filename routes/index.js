const express = require('express');

const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  // console.log('Yooooo');
  // const devon = { name: 'devon', hair: 'black', fresh: true };
  res.send('Hey! It works!');
  // res.json(devon);
});

module.exports = router;
