const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const slug = require('slugs');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name!',
  },
  slug: String,
  description: {
    type: String,
    trim: true,
  },
  tags: [String],
  created: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: [
      {
        type: Number,
        default: 'You must supply coordinates!',
      },
    ],
    address: {
      type: String,
      default: 'You must require an address!',
    },
  },
  photo: String,
});

storeSchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    return next();
  }
  this.slug = slug(this.name);
  next();
  // TODO: Make more resilient so that slugs are unique
});

module.exports = mongoose.model('Store', storeSchema);
