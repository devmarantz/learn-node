const express = require('express');

const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  // console.log('Yooooo');
  // const devon = { name: 'devon', hair: 'black', fresh: true };
  // res.send(devon);
  // res.json(req.query);
  res.render('hello', {
    name: 'Devon',
    dog: req.query.dog,
  });
});

router.get('/reverse/:name', (req, res) => {
  const reverse = [...req.params.name].reverse().join('');
  res.send(reverse);
});

module.exports = router;
